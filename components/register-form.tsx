"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

import { useLanguage } from "@/components/language-provider";

export function RegisterForm() {
  const router = useRouter();
  const { copy } = useLanguage();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/thank-you");
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <label>
        {copy.form.firstName}
        <input type="text" name="firstName" autoComplete="given-name" required />
      </label>

      <label>
        {copy.form.lastName}
        <input type="text" name="lastName" autoComplete="family-name" required />
      </label>

      <label>
        {copy.form.phone}
        <input type="tel" name="phone" autoComplete="tel" required />
      </label>

      <label>
        {copy.form.email}
        <input type="email" name="email" autoComplete="email" required />
      </label>

      <label>
        {copy.form.guests}
        <input type="number" name="guests" min="0" defaultValue="0" />
      </label>

      <label>
        {copy.form.notes}
        <textarea name="notes" rows={5} />
      </label>

      <button type="submit" className="button button-primary button-full">
        {copy.form.send}
      </button>
    </form>
  );
}
