import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { useForm, Controller } from 'react-hook-form';
import { Container, Typography, TextField, List, ListItem, ListItemText, ListItemIcon, IconButton, Checkbox, CircularProgress, Fab } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

interface ShoppingItem {
  id: bigint;
  text: string;
  completed: boolean;
  completedAt: bigint | null;
}

function App() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const result = await backend.getItems();
      setItems(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error);
      setLoading(false);
    }
  };

  const onSubmit = async (data: { newItem: string }) => {
    setLoading(true);
    try {
      await backend.addItem(data.newItem);
      reset({ newItem: '' });
      await fetchItems();
    } catch (error) {
      console.error('Error adding item:', error);
      setLoading(false);
    }
  };

  const handleToggleComplete = async (id: bigint, completed: boolean) => {
    setLoading(true);
    try {
      await backend.markItemCompleted(id, !completed);
      await fetchItems();
    } catch (error) {
      console.error('Error toggling item completion:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: bigint) => {
    setLoading(true);
    try {
      await backend.deleteItem(id);
      await fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping List
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="newItem"
          control={control}
          defaultValue=""
          rules={{ required: 'Item is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Add new item"
              variant="outlined"
              fullWidth
              error={!!error}
              helperText={error?.message}
              InputProps={{
                endAdornment: (
                  <IconButton type="submit" edge="end">
                    <AddIcon />
                  </IconButton>
                ),
              }}
            />
          )}
        />
      </form>
      {loading ? (
        <CircularProgress style={{ marginTop: '20px' }} />
      ) : (
        <List>
          {items.map((item) => (
            <ListItem key={Number(item.id)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={item.completed}
                  onChange={() => handleToggleComplete(item.id, item.completed)}
                />
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                style={{ textDecoration: item.completed ? 'line-through' : 'none' }}
              />
              <IconButton edge="end" onClick={() => handleDelete(item.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
        onClick={() => document.querySelector('input')?.focus()}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
}

export default App;
