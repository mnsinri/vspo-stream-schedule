import { useDateHeader } from "./viewModel";

function Icon() {
  const calcHeight = (max: number) => max - 7 * Math.random();
  const barParams = [
    { id: 0, height: calcHeight(30), bgColor: "bg-vspo-primary" },
    { id: 1, height: calcHeight(20), bgColor: "bg-vspo-secondary" },
    { id: 2, height: calcHeight(16), bgColor: "bg-vspo-primary" },
  ];

  return (
    <div className="flex gap-[5px] w-[30px]">
      {barParams.map(({ id, height, bgColor }) => (
        <div
          key={id}
          style={{ height }}
          className={`w-[5px] mt-auto rounded-tr-[5px] rounded-bl-[3px] outline-3 outline-solid outline-primary-foreground ${bgColor} transition-[height] duration-300`}
        />
      ))}
    </div>
  );
}

type Props = {
  dateString: string;
};
export function DateLabel({ dateString }: Props) {
  const { dataForDisplay } = useDateHeader(dateString);

  return (
    <div className="flex h-[50px] my-[25px] sticky top-[70px] z-[2]">
      <Icon />
      <div className="relative mt-[10px]">
        <div
          className="
          text-5xl font-[Itim] tracking-tight
          text-primary"
        >
          {dataForDisplay}
        </div>
        <div
          className="
          text-5xl font-[Itim] tracking-tight 
          text-primary-foreground absolute top-0 z-[-1] date-outline"
        >
          {dataForDisplay}
        </div>
      </div>
    </div>
  );
}
