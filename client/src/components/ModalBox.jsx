import React, { useState } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

export default function ModalBox({
  header,
  text,
  deleteModal,
  setDeleteModal,
  action,
}) {
  return (
    <div>
      <Modal
        size="mini"
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        onOpen={() => setDeleteModal(true)}
      >
        <Header icon="trash alternate" content={header} />
        <Modal.Content>
          <p>{text}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            style={{ backgroundColor: "var(--red-dark)" }}
            onClick={(e) => action(e)}
          >
            <Icon name="checkmark" /> Yes
          </Button>
          <Button
            style={{ backgroundColor: "var(--green-dark)" }}
            onClick={() => setDeleteModal(false)}
          >
            <Icon name="cancel" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
