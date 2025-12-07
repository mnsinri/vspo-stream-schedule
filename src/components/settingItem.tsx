import { ComponentProps } from "react";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { IoIosArrowForward } from "react-icons/io";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem as _SelectItem,
} from "./ui/select";
import { Input } from "./ui/input";

type ItemBase = {
  label: string;
  description?: string;
  className?: string;
};

function Label({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      {...props}
      className={cn("text-sm font-medium leading-none", className)}
    />
  );
}

function Description({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      {...props}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
    />
  );
}

function Header({ className, ...props }: ComponentProps<"h3">) {
  return <h3 {...props} className={cn("text-lg font-bold", className)}></h3>;
}

function Item({
  label,
  description,
  className,
  children,
  ...props
}: ItemBase & ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-row items-center justify-between p-3 bg-menu-item",
        className
      )}
    >
      <div className="space-y-0.5">
        <Label>{label}</Label>
        {description && <Description>{description}</Description>}
      </div>
      {children}
    </div>
  );
}

function SelectItem({
  label,
  description,
  className,
  values,
  ...props
}: ItemBase & ComponentProps<typeof Select> & { values: string[] }) {
  return (
    <Item label={label} description={description} className={className}>
      <Select {...props}>
        <SelectTrigger className="w-28 bg-background">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {values.map((v) => (
            <_SelectItem key={v} value={v}>
              {capitalizeFirstLetter(v)}
            </_SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Item>
  );
}

function SwitchItem({
  label,
  description,
  className,
  ...props
}: ItemBase & ComponentProps<typeof Switch>) {
  return (
    <Item label={label} description={description} className={className}>
      <Switch {...props} className="data-[state=checked]:bg-vspo-primary" />
    </Item>
  );
}

function EntryItem({
  label,
  description,
  className,
  children,
  ...props
}: ItemBase & ComponentProps<typeof Item>) {
  return (
    <Item
      label={label}
      description={description}
      className={cn(
        "hover:bg-foreground/10 transition-[background-color] duration-200",
        className
      )}
      {...props}
    >
      {children}
      <IoIosArrowForward />
    </Item>
  );
}

function InputItem({
  label,
  description,
  className,
  ...props
}: ItemBase & Omit<ComponentProps<typeof Input>, "className">) {
  return (
    <Item label={label} description={description} className={className}>
      <Input {...props} className="w-48" />
    </Item>
  );
}

export { Label, Description, Header, Item, SelectItem, SwitchItem, EntryItem, InputItem };
