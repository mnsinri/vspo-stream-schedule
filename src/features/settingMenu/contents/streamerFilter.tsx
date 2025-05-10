import { Streamer } from "@types";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { StreamerIconList } from "@/components/streamerIconList";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/settingItem";
import { IoIosArrowBack } from "react-icons/io";
import { MdFilterListOff } from "react-icons/md";

type Props = Omit<ComponentProps<typeof StreamerIconList>, "renderIcon"> & {
  onClickBack: () => void;
  onClickIcon: (id: Streamer["id"], isSelected: boolean) => void;
  onClickClear: () => void;
};

export function StreamerFilter({
  className,
  ids = [],
  onClickBack,
  onClickIcon,
  onClickClear,
  ...props
}: Props) {
  const renderIcon = (streamer: Streamer) => {
    const isSelected = ids.includes(streamer.id);
    return (
      <img
        key={streamer.id}
        src={streamer.youtube.icon}
        alt={streamer.youtube.name}
        data-selected={isSelected}
        className="border-3 rounded-xl shadow-md data-[selected=true]:border-vspo-primary hover:scale-95 transition-all duration-150"
        onClick={() => onClickIcon(streamer.id, isSelected)}
      />
    );
  };

  function getClearButton() {
    return (
      <div
        className="border-3 rounded-[50%] shadow-md hover:scale-95 transition-all duration-150 flex justify-center items-center text-4xl bg-card"
        onClick={onClickClear}
      >
        <MdFilterListOff />
      </div>
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        onClick={onClickBack}
        className="text-sm absolute top-2 left-1 hidden sm:flex"
      >
        <IoIosArrowBack />
        <p className="mb-0.5">Back</p>
      </Button>
      <Header className="mt-6 mb-4">Filter by streamer</Header>
      <StreamerIconList
        {...props}
        renderIcon={renderIcon}
        className={cn("grid grid-cols-5 gap-3", className)}
      >
        {getClearButton()}
      </StreamerIconList>
    </>
  );
}
