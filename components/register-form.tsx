"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/thank-you");
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <label>
        First name
        <input type="text" name="firstName" autoComplete="given-name" required />
      </label>

      <label>
        Last name
        <input type="text" name="lastName" autoComplete="family-name" required />
      </label>

      <label>
        Phone
        <input type="tel" name="phone" autoComplete="tel" required />
      </label>

      <label>
        Email
        <input type="email" name="email" autoComplete="email" required />
      </label>

      <label>
        Number of guests
        <input type="number" name="guests" min="0" defaultValue="0" />
      </label>

      <label>
        Notes
        <textarea name="notes" rows={5} />
      </label>

      <button type="submit" className="button button-primary button-full">
        Send Registration
      </button>
    </form>
  );
}
