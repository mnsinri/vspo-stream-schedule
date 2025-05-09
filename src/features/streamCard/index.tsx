import { type Stream } from "@types";
import {
  StreamCard as StreamCardContainer,
  StreamCardThumbnail,
  StreamCardHeader,
  StreamCardStatus,
  StreamCardFooter,
} from "@/components/streamCard";
import { PlatformIcon } from "@/components/platformIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useStreamCard } from "./viewModel";
import { Marquee } from "../marquee";

type Props = {
  stream: Stream;
};

export function StreamCard({ stream: _stream }: Props) {
  const {
    stream,
    streamState,
    scheduledTimeHHMM,
    isMarqueeTitle,
    hoverParams,
    speed,
  } = useStreamCard(_stream);

  const platformIconColor = streamState !== "live" ? "text-primary" : undefined;

  return (
    <StreamCardContainer
      className="w-full transition-opacity duration-250 starting:opacity-0"
      href={stream.url}
      target="_blank"
      {...hoverParams}
    >
      <StreamCardThumbnail src={stream.thumbnail} />
      <StreamCardHeader className="w-full p-1.5 flex justify-end">
        <StreamCardStatus>
          <PlatformIcon
            platform={stream.platform}
            className={`size-4 sm:size-5 ${platformIconColor}`}
          />
          <div className="font-bold">{scheduledTimeHHMM}</div>
        </StreamCardStatus>
      </StreamCardHeader>
      <StreamCardFooter className="p-1 h-10 sm:h-14 flex items-center gap-1">
        <Avatar className="size-auto h-full">
          <AvatarImage src={stream.icon} alt={stream.streamerName} />
          <AvatarFallback>{stream.streamerName.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex flex-col justify-center">
          <Marquee
            className="text-[12px] sm:text-lg truncate"
            isAnimate={isMarqueeTitle}
            speed={speed}
          >
            {stream.title}
          </Marquee>
          <div className="text-[10px] sm:text-sm truncate">
            {stream.streamerName}
          </div>
        </div>
      </StreamCardFooter>
    </StreamCardContainer>
  );
}
