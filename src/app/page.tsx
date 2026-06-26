"use client"

import { useState } from "react";
import { supabase } from "@/lib/supabase";

function Header() {
  return (
    <header>
      <h1 className="text-center text-5xl font-bold mb-4">Formulário de pesquisa</h1>
      <p className="text-center text-2xl font-bold mb-4">Responda com sinceridade a pesquisa a seguir:</p>
    </header>
  );
}

function Questions() {
  const [Message, setMessage] = useState("")

  const [form, setForm] = useState({
    "nome": "",
    "idade": "",
    "observacoes": ""
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { error } = await supabase.from("responses").insert({
      nome: form.nome,
      idade: Number(form.idade),
      observacoes: form.observacoes
    });
    if (error) {
      console.error(error);
      setMessage("Erro ao enviar formulário")
    }
    else {
      setMessage("Formulário enviado com sucesso")
    }
  }

  return (
    <div>
      <form className="flex flex-col items-center justify-center space-y-4" onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome:</label>
        <input className="border border-gray-300 rounded px-2 py-1 w-1/2" type="text" id="nome" name="nome" value={form.nome} onChange={handleChange} />
        <label htmlFor="idade">Idade:</label>
        <input className="border border-gray-300 rounded px-2 py-1 w-1/2" type="number" id="idade" name="idade" value={form.idade} onChange={handleChange} />
        <label htmlFor="observacoes">Observações:</label>
        <textarea className="border border-gray-300 rounded px-2 py-1 w-1/2" id="observacoes" name="observacoes" value={form.observacoes} onChange={handleChange} />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex justify-center items-center m-auto" type="submit">Enviar</button>
      </form>
      <p>{Message}</p>
    </div>
  )
}

export default function Home() {
  return (
    <main>
      <Header />
      <Questions />
    </main>
  );
}
