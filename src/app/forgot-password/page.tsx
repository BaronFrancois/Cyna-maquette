"use client";

import AppLayoutRegLog from "@/layout/AppLayoutRegLog";
import api from "@/lib/api";
import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    alert("test");
    e.preventDefault();

    try {
      await api().post("/auth/forgot-password", { email });
      setMessage("Un email de réinitialisation a été envoyé !");
    } catch (error) {
      setMessage("Erreur : impossible d’envoyer l’email.");
    }
  };

  return (
    <AppLayoutRegLog>
      <h2>Mot de passe oublié</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Adresse email :
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Envoyer</button>
      </form>
      {message && <p>{message}</p>}
    </AppLayoutRegLog>
  );
}

export default ForgotPassword;
