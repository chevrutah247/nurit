import type { Metadata } from "next";

import { RegisterForm } from "@/components/register-form";

export const metadata: Metadata = {
  title: "Register",
  description: "Register quickly with large fields, simple wording, and a clear submit path."
};

export default function RegisterPage() {
  return (
    <div className="register-layout">
      <section className="register-panel">
        <p className="eyebrow">Register</p>
        <h1>A large, simple form that feels comfortable even for first-time users.</h1>
        <p>
          Only the most important fields appear first. The goal is to make
          registration feel calm and obvious.
        </p>
        <ul>
          <li>Large input fields</li>
          <li>Minimal required information</li>
          <li>One main button at the end</li>
          <li>Clear thank-you page after submission</li>
        </ul>
      </section>

      <section className="register-panel">
        <RegisterForm />
      </section>
    </div>
  );
}
