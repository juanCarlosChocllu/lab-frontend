import { useState } from "react";

export function modalAccion (){
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return {isOpen, openModal, closeModal}
}