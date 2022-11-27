import React, { MouseEventHandler } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { BoardData } from 'store/boards';
import { useNavigate } from 'react-router-dom';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from 'store';
import { ModalTypes, openModal } from 'store/modal';
import { DeleteItems } from 'components/Modal/ConfirmDeletion/ConfirmDeletion';

export const BoardItem = ({ board }: { board: BoardData }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const description =
    board.description.length > 50 ? `${board.description.slice(0, 47)}...` : board.description;

  const expandBoard: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(openModal({ type: ModalTypes.SHOW_BOARD, props: { board } }));
  };

  const editBoard: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(openModal({ type: ModalTypes.EDIT_BOARD, props: { board } }));
  };

  const handleDeleteBoard: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(
      openModal({ type: ModalTypes.DELETE, props: { id: board.id, type: DeleteItems.BOARD } })
    );
  };

  return (
    <Card
      onClick={() => navigate(`/boards/${board.id}`)}
      sx={{ cursor: 'pointer', width: '200px', display: 'flex', flexDirection: 'column' }}
      title="Go to the board"
    >
      <CardHeader
        title={
          <Typography component="h5" variant="h5" sx={{ maxWidth: '135px', overflow: 'hidden' }}>
            {board.title}
          </Typography>
        }
        disableTypography={true}
        action={
          <IconButton onClick={expandBoard} title="Show details">
            <ManageSearchIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="body2" sx={{ overflowWrap: 'break-word' }}>
          {description}
        </Typography>
      </CardContent>
      <Stack direction="row" gap={1} justifyContent="center" sx={{ p: 1, mt: 'auto' }}>
        <Button
          size="small"
          variant="outlined"
          title="edit"
          startIcon={<EditIcon />}
          onClick={editBoard}
        >
          Edit
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          title="delete"
          endIcon={<DeleteIcon />}
          onClick={handleDeleteBoard}
        >
          Delete
        </Button>
      </Stack>
    </Card>
  );
};
