import { useState } from "react";

export function useModal() {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);

  const closeModal = () => {
    setShowShareModal(false);
    setShowSignatureModal(false);
  };

  const openShareModal = () => {
    setShowShareModal(true);
    setShowSignatureModal(false);
  };

  const openSignatureModal = () => {
    setShowSignatureModal(true);
    setShowShareModal(false);
  };

  return { showShareModal, showSignatureModal, openShareModal, openSignatureModal, closeModal };
}