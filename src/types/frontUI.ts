import { StreamInfo, Services } from "./frontLogic";

export type WindowSize = {
  width: number;
  height: number;
};

export type WindowType = {
  isMobile: boolean;
  isDesktop: boolean;
};

export type ThumbnailBlockProps = {
  title: string;
  thumbnail: string;
  name: string;
  icon: string;
  isExpand: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export type ServiceIconProps = {
  startAt: string;
  isExpand: boolean;
} & Services &
  React.HTMLAttributes<HTMLDivElement>;

export type StreamingHeaderProps = Omit<ThumbnailBlockProps, "thumbnail">;

export type StreamingCardProps = Omit<
  ServiceIconProps & ThumbnailBlockProps,
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
