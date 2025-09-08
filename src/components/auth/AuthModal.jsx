import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '../ui/dialog';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

export const AuthModal = ({ isOpen, onClose, defaultMode = 'signin' }) => {
  const [mode, setMode] = useState(defaultMode);

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</DialogTitle>
        </DialogHeader>
        {mode === 'signin' ? (
          <SignInForm onToggleMode={toggleMode} onSuccess={onClose} />
        ) : (
          <SignUpForm onToggleMode={toggleMode} onSuccess={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};

