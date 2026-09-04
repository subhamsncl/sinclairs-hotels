import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NewsletterForm } from './newsletter-form';

describe('NewsletterForm', () => {
  it('renders an email input and a submit button', () => {
    render(<NewsletterForm />);
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument();
  });

  it('renders the honeypot field hidden from assistive tech and sighted users', () => {
    render(<NewsletterForm />);
    const honeypot = document.querySelector('input[name="company"]');
    expect(honeypot).not.toBeNull();
    expect(honeypot).toHaveAttribute('aria-hidden', 'true');
    expect(honeypot).toHaveAttribute('tabindex', '-1');
  });
});
