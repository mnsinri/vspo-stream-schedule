import { Streamer } from "@types";
import { ComponentProps } from "react";
import { StreamerIconList } from "@/components/streamerIconList";
import { Header } from "@/components/settingItem";
import { MdFilterListOff } from "react-icons/md";

type Props = Omit<ComponentProps<typeof StreamerIconList>, "renderIcon"> & {
  onClickIcon: (id: Streamer["id"], isSelected: boolean) => void;
  onClickClear: () => void;
} & ComponentProps<"div">;

export function StreamerFilter({
  ids = [],
  onClickIcon,
  onClickClear,
  ...props
}: Props) {
  const renderIcon = (streamer: Streamer) => {
    const isSelected = ids.includes(streamer.id);
    return (
      <div key={streamer.id} className="flex justify-center items-center">
        <img
          src={streamer.youtube.icon}
          alt={streamer.youtube.name}
          data-selected={isSelected}
          className="border-3 rounded-xl shadow-md data-[selected=true]:border-vspo-primary hover:scale-95 transition-all duration-150"
          onClick={() => onClickIcon(streamer.id, isSelected)}
        />
      </div>
    );
  };

  function getClearButton() {
    return (
      <div className="flex justify-center items-center">
        <div
          className="aspect-square h-full border-3 rounded-[50%] shadow-md hover:scale-95 transition-all duration-150 flex justify-center items-center text-4xl bg-card"
          onClick={onClickClear}
        >
          <MdFilterListOff />
        </div>
      </div>
    );
  }

  return (
    <div {...props}>
      <Header className="mb-4">Filter by streamer</Header>
      <StreamerIconList
        renderIcon={renderIcon}
        className="grid grid-cols-5 gap-3 mb-1"
      >
        {getClearButton()}
      </StreamerIconList>
    </div>
  );
}
