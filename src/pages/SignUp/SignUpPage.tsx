import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Link, Paper, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ERRORS } from 'constants/ValidationErrors';
import { ROUTES } from 'constants/Routes';

export const SignUpPage = () => {
  const theme = useTheme();
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm<{ name: string; login: string; password: string }>();

  const onSubmit: SubmitHandler<{ name: string; login: string; password: string }> = (data: {
    name: string;
    login: string;
    password: string;
  }) => {
    reset();
  };

  return (
    <Paper
      id="form"
      component="form"
      sx={{
        p: 3,
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette.grey[100],
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        {...register('name', { required: ERRORS.required })}
        fullWidth
        error={!!errors.name}
        helperText={(errors.name?.message as string) || ''}
        label="Name"
      />
      <TextField
        {...register('login', { required: ERRORS.required })}
        fullWidth
        error={!!errors.login}
        helperText={(errors.login?.message as string) || ''}
        label="Login"
        margin="normal"
      />
      <TextField
        {...register('password', { required: ERRORS.required })}
        fullWidth
        error={!!errors.password}
        helperText={(errors.password?.message as string) || ''}
        label="Password"
        type="password"
        autoComplete="current-password"
        margin="normal"
      />
      <Box>
        <Button
          sx={{ my: 2 }}
          type="submit"
          form="form"
          variant="contained"
          color="secondary"
          disabled={isDirty && !!Object.keys(errors).length}
        >
          Sign up
        </Button>
      </Box>
      <Link href={ROUTES.SING_IN} sx={{ my: 2 }}>
        Already have an account? Sign In
      </Link>
    </Paper>
  );
};
