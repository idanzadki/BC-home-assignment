/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useContext, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

type ModalProps<T extends React.JSXElementConstructor<any>> = Omit<
  React.ComponentProps<T>,
  "onClose"
> &
  Partial<Pick<React.ComponentProps<T>, "onClose">>;

export const createModalProvider = <
  T extends Record<string, React.JSXElementConstructor<any>>
>(
  modals: T
) => {
  const ModalContext = React.createContext({
    // eslint-disable-next-line
    openModal: <M extends keyof T>(
      modal: M,
      props: ModalProps<(typeof modals)[M]>
    ) => {},
    // eslint-disable-next-line
    closeModal: () => {},
  });

  const useModal = () => useContext(ModalContext);

  const ModalProvider = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalName, setModalName] = useState<keyof T>();
    const [modalProps, setModalProps] = useState<any>({});
    const Modal = modalName ? modals[modalName] : null;

    const handleClose = () => {
      setIsOpen(false);
      setModalName(undefined);
    };

    const handleOpen = <M extends keyof T>(
      modal: M,
      props: ModalProps<(typeof modals)[M]>
    ) => {
      setModalName(modal);
      setModalProps(props);
      setIsOpen(true);
    };

    const value = {
      openModal: handleOpen,
      closeModal: handleClose,
    };

    return (
      <ModalContext.Provider value={value}>
        {props.children}
        {Modal && <Modal open={isOpen} onClose={handleClose} {...modalProps} />}
      </ModalContext.Provider>
    );
  };
  return {
    ModalProvider,
    useModal,
  };
};
