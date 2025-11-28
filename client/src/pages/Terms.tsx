import React from "react";

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-display font-bold text-primary neon-text">Termos de Uso</h1>
        <p className="text-muted-foreground">Última atualização: 28 de Novembro de 2025</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">1. Aceitação dos Termos</h2>
          <p>
            Ao acessar e usar o Hardzera, você concorda em cumprir e ficar vinculado aos seguintes termos e condições de uso. Se você não concordar com estes termos, não deverá usar nosso site ou serviços.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">2. Uso do Conteúdo</h2>
          <p>
            Todo o conteúdo fornecido neste site é apenas para fins educacionais e informativos. O Hardzera não se responsabiliza pelo uso indevido das ferramentas ou informações aqui disponibilizadas. O usuário assume total responsabilidade por suas ações.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">3. Contas de Usuário</h2>
          <p>
            Para acessar certas funcionalidades, você pode precisar criar uma conta. Você é responsável por manter a confidencialidade de suas credenciais e por todas as atividades que ocorram sob sua conta.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">4. Propriedade Intelectual</h2>
          <p>
            As marcas registradas, logotipos e marcas de serviço exibidas no site são propriedade do Hardzera ou de terceiros. É proibido usar essas marcas sem o consentimento prévio por escrito.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">5. Limitação de Responsabilidade</h2>
          <p>
            Em nenhuma circunstância o Hardzera será responsável por quaisquer danos diretos, indiretos, incidentais, especiais ou consequentes decorrentes do uso ou da incapacidade de usar o site.
          </p>
        </section>
      </div>
    </div>
  );
}
