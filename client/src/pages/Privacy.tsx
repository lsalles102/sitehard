import React from "react";

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-display font-bold text-primary neon-text">Política de Privacidade</h1>
        <p className="text-muted-foreground">Última atualização: 28 de Novembro de 2025</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">1. Coleta de Informações</h2>
          <p>
            Coletamos informações que você nos fornece diretamente, como quando cria uma conta, assina nossa newsletter ou entra em contato conosco. As informações podem incluir seu nome, endereço de e-mail e outras informações de contato.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">2. Uso das Informações</h2>
          <p>
            Usamos as informações coletadas para:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Fornecer, manter e melhorar nossos serviços;</li>
            <li>Enviar comunicações técnicas, atualizações e alertas de segurança;</li>
            <li>Responder a seus comentários, perguntas e solicitações;</li>
            <li>Monitorar e analisar tendências, uso e atividades em conexão com nossos serviços.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">3. Cookies</h2>
          <p>
            Usamos cookies e tecnologias semelhantes para rastrear a atividade em nosso serviço e manter certas informações. Você pode instruir seu navegador para recusar todos os cookies ou indicar quando um cookie está sendo enviado.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">4. Compartilhamento de Dados</h2>
          <p>
            Não vendemos, trocamos ou transferimos suas informações pessoais para terceiros sem o seu consentimento, exceto conforme necessário para fornecer nossos serviços ou cumprir a lei.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">5. Segurança</h2>
          <p>
            Tomamos medidas razoáveis para proteger suas informações contra perda, roubo, uso indevido e acesso não autorizado, divulgação, alteração e destruição.
          </p>
        </section>
      </div>
    </div>
  );
}
