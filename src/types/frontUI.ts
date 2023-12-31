import { StreamInfo, Service, ChildrenNode } from "./frontLogic";

export type WindowSize = {
  width: number;
  height: number;
};

export type ClientType = {
  isMobile: boolean;
  isPhoneSize: boolean;
  isTabletSize: boolean;
  isDesktopSize: boolean;
};

export type ThumbnailBlockProps = {
  title: string;
  thumbnail: string;
  name: string;
  icon: string;
  isExpand: boolean;
  hovered: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export type ServiceIconProps = {
  startAt: string;
  isExpand: boolean;
  service: Service;
} & React.HTMLAttributes<HTMLDivElement>;

export type StreamingHeaderProps = Omit<ThumbnailBlockProps, "thumbnail">;

export type StreamingCardProps = Omit<
  ServiceIconProps & Omit<ThumbnailBlockProps, "hovered">,
  "isExpand"
> & {
  url: string;
};

export type StreamingTableProps = {
  streams: StreamInfo[];
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

export type StreamList = {
  date: string;
  streams: StreamInfo[];
};
