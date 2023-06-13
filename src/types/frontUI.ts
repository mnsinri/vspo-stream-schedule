import { StreamingInfo } from "./frontLogic";

export type ThumbnailBlockProps = {
  title: string;
  thumbnail: string;
  name: string;
  icon: string;
  isExpand: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export type ServiceIconProps = Pick<
  StreamingInfo,
  "service" | "scheduledStartTime"
> & { isExpand: boolean } & React.HTMLAttributes<HTMLDivElement>;

export type StreamingHeaderProps = Omit<ThumbnailBlockProps, "thumbnail">;

export type StreamingCardProps = Omit<
  ServiceIconProps & ThumbnailBlockProps,
  "isExpand"
> & {
  url: string;
};

export type StreamingTableProps = {
  streams: StreamingInfo[];
} & React.HTMLAttributes<HTMLDivElement>;

export type DateBorderProps = {
  dateString: string;
} & React.HTMLAttributes<HTMLDivElement>;

export type BaseButtonProps = {
  onClickHandler: () => void;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export type LinkButtonProps = {
  url: string;
} & Omit<BaseButtonProps, "onClickHandler">;
