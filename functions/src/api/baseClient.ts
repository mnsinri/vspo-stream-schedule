import { DocumentReference, DocumentData } from "firebase-admin/firestore";
import { Platform, Channel, BaseStream } from "../../types";

export abstract class Client {
  private token = "";

  constructor(
    protected tokenDoc: DocumentReference<DocumentData>,
    private platform: Platform,
  ) {}

  protected abstract generateToken(): Promise<string>;
  abstract getChannels(userIds: string[]): Promise<Channel[]>;
  abstract getStreams(userIds: string[]): Promise<BaseStream[]>;

  protected async getToken(): Promise<string> {
    if (this.token) return this.token;

    const doc = await this.tokenDoc.get();
    this.token = doc.data()?.[this.platform];

    if (!this.token) this.token = await this.generateToken();

    return this.token;
  }

  protected async setToken(token: string): Promise<void> {
    this.token = token;
    await this.tokenDoc.update({ [this.platform]: token });
  }

  protected async request(
    createRequest: (token: string) => Request,
  ): Promise<any> {
    const token = await this.getToken();

    const req = createRequest(token);
    const response = await fetch(req);

    if (response.ok) return response.json();

    if (response.status === 401) {
      const newToken = await this.generateToken();
      const secondResponse = await fetch(createRequest(newToken));
      return secondResponse.json();
    }

    throw new Error(
      `request failed.\n${response.url}\n${response.status}:${response.statusText}`,
    );
  }
}
