import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import AddEntryForm from './AddEntryForm';
import { baseAddEntryFormValues } from '../types';

interface Props {
  modalOpen: boolean;
  error?: string;
  onSubmit: (values: baseAddEntryFormValues) => void; 
  onClose: () => void
}

const AddEntryModal = ({modalOpen, error,  onSubmit, onClose}: Props)  => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose}/>
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;