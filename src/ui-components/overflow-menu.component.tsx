import React, { useState, useCallback, useEffect, useRef } from "react";
import classNames from "classnames";
import { useLayoutType } from "@openmrs/esm-framework";
import styles from "./overflow-menu.scss";

export interface OrderCustomOverflowMenuComponentRenderProps {
  onMenuItemClick: () => void;
}

interface OrderCustomOverflowMenuComponentProps {
  menuTitle: React.ReactNode;
  hideMenuOnClick?: boolean;
  render?: (
    renderProps: OrderCustomOverflowMenuComponentRenderProps
  ) => React.ReactNode;
  children?: React.ReactNode;
  menuDirection?: "top" | "bottom";
}

const OrderCustomOverflowMenuComponent: React.FC<
  OrderCustomOverflowMenuComponentProps
> = ({ children, menuTitle, hideMenuOnClick, render, menuDirection }) => {
  const [showMenu, setShowMenu] = useState(false);
  const isTablet = useLayoutType() === "tablet";
  const wrapperRef = useRef(null);

  const toggleShowMenu = useCallback(() => setShowMenu((state) => !state), []);

  useEffect(() => {
    /**
     * Toggle showMenu if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const onMenuItemClick = useCallback(() => {
    if (hideMenuOnClick) {
      setShowMenu(false);
    }
  }, [hideMenuOnClick]);

  return (
    <div
      data-overflow-menu
      className={classNames("cds--overflow-menu", styles.container)}
      ref={wrapperRef}
    >
      <button
        className={classNames(
          "cds--btn",
          "cds--btn--ghost",
          "cds--overflow-menu__trigger",
          { "cds--overflow-menu--open": showMenu },
          styles.overflowMenuButton
        )}
        aria-haspopup="true"
        aria-expanded={showMenu}
        id="custom-actions-overflow-menu-trigger"
        aria-controls="custom-actions-overflow-menu"
        onClick={toggleShowMenu}
      >
        {menuTitle}
      </button>
      <div
        className={classNames(
          "cds--overflow-menu-options",
          "cds--overflow-menu--flip",
          styles.menu,
          {
            [styles.show]: showMenu,
          }
        )}
        tabIndex={0}
        data-floating-menu-direction={menuDirection ?? "bottom"}
        role="menu"
        aria-labelledby="custom-actions-overflow-menu-trigger"
        id="custom-actions-overflow-menu"
      >
        <ul
          className={classNames("cds--overflow-menu-options__content", {
            "cds--overflow-menu-options--lg": isTablet,
          })}
        >
          {render && render({ onMenuItemClick })}
          {children && children}
        </ul>
        <span />
      </div>
    </div>
  );
};

export default OrderCustomOverflowMenuComponent;
