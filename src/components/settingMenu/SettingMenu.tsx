import React, { useEffect, useMemo, useRef, useState } from "react";
import { MenuItem } from "./MenuItem";
import { ToggleButtonItem } from "./ToggleButtonItem";
import { animated, useTransition } from "@react-spring/web";
import styled from "styled-components";
import { useConfig, useTheme, useWindowSize } from "../../hooks";

import { BiMenu, BiExpandAlt } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import { TbMoonFilled } from "react-icons/tb";
import { TbMarquee2 } from "react-icons/tb";

const MenuButton = styled(animated.button)`
  border: 0;
  border-radius: 5px;
  background-color: transparent;
  transition: 0.3s ease;
  color: ${(p) => p.theme.text.primary};

  &:hover {
    background-color: ${(p) => p.theme.hoverd.primary};
  }

  &:active {
    background-color: ${(p) => p.theme.hoverd.secondary};
  }
`;

const Container = styled(animated.ol)<{ right: number }>`
  position: absolute;
  top: 60px;
  right: ${(p) => p.right}px;
  z-index: 100;
  width: 250px;
  border: 5px solid ${(p) => p.theme.bg.secondary};
  border-radius: 7px;
  box-shadow: 0px 3px 6px 2px rgba(0, 0, 0, 0.2);
  background-color: ${(p) => p.theme.bg.secondary};
  padding: 2px;
`;

const Border = styled.hr`
  border-top: 1px solid ${(p) => p.theme.border.primary};
  margin: 7px 0px;
  padding: 0 5px;
`;

export const SettingMenu: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const refOl = useRef<HTMLOListElement>(null!);
  const refBtn = useRef<HTMLButtonElement>(null!);
  const { width, isMobile, isDesktopSize } = useWindowSize();

  const { themeType, setThemeDark } = useTheme();
  const { config, configSetter } = useConfig();

  const right = useMemo(
    () => width - refBtn.current?.getBoundingClientRect().right,
    [width]
  );

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (!(e.target instanceof Node)) return;

      const isOutSideMenu = refOl.current && !refOl.current.contains(e.target);
      const isOutSideBtn = refBtn.current && !refBtn.current.contains(e.target);

      if (isOutSideMenu && isOutSideBtn) setOpen(false);
    };

    if (config.scrollContainerRef.current != undefined) {
      config.scrollContainerRef.current.style.overflow = isOpen
        ? "hidden"
        : "scroll";
    }

    if (isOpen) document.addEventListener("click", checkIfClickedOutside);
    return () => document.removeEventListener("click", checkIfClickedOutside);
  }, [isOpen]);

  const transitions = useTransition(isOpen, {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -10 },
  });

  return (
    <>
      <MenuButton ref={refBtn} onClick={() => setOpen((o) => !o)}>
        <BiMenu size={28} />
      </MenuButton>
      {transitions(
        (style, item) =>
          item && (
            <Container ref={refOl} style={style} right={right}>
              <MenuItem
                icon={<FaGithub size={18} />}
                text="Github"
                onClick={() =>
                  window.open("https://github.com/mnsinri/vspo-stream-schedule")
                }
              />
              <Border />
              <MenuItem text="Settings" style={{ fontSize: 13 }} />
              <ToggleButtonItem
                initState={themeType === "dark"}
                contents={{
                  icon: <TbMoonFilled size={18} />,
                  text: "Dark theme",
                }}
                onChange={(isOn) => setThemeDark(isOn)}
              />
              <ToggleButtonItem
                initState={config.isExpandAlways}
                disabled={isMobile || !isDesktopSize}
                contents={{
                  icon: <BiExpandAlt size={18} />,
                  text: "Expand always",
                }}
                onChange={(isOn) => configSetter.setExpandAlways(isOn)}
              />
              <ToggleButtonItem
                initState={config.isMarquee}
                contents={{
                  icon: <TbMarquee2 size={18} />,
                  text: "Marquee title",
                }}
                onChange={(isOn) => configSetter.setMarquee(isOn)}
              />
            </Container>
          )
      )}
    </>
  );
};
