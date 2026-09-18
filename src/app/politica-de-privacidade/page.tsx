import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { SITE_CONFIG } from '@/config/site';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: `Política de Privacidade — ${SITE_CONFIG.name}`,
  description: 'Informações claras sobre o tratamento de dados pessoais em conformidade com a LGPD.',
};

export default function PoliticaPrivacidade() {
  return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.topBar}>
            <Link href="/" className={styles.backLink}>
              ← Voltar para a página inicial
            </Link>
          </div>

          <article className={styles.article}>
            <h1 className={styles.title}>Política de Privacidade e Tratamento de Dados (LGPD)</h1>
            <p className={styles.updated}>Última atualização: Setembro de 2026</p>

            <section className={styles.section}>
              <h2>1. Identificação do Controlador de Dados</h2>
              <p>
                O presente documento rege as diretrizes de privacidade das comunicações realizadas através desta Landing Page, mantida por <strong>{SITE_CONFIG.name}</strong> ({SITE_CONFIG.role}, inscrita na OAB sob o número {SITE_CONFIG.oab}), com atuação em Araripina/PE e atendimento online nacional.
              </p>
            </section>

            <section className={styles.section}>
              <h2>2. Quais dados são coletados e por quê?</h2>
              <p>
                Coletamos apenas as informações estritamente necessárias para viabilizar o primeiro contato e direcionar a análise inicial de sua demanda:
              </p>
              <ul>
                <li><strong>Nome completo:</strong> Para identificação e tratamento respeitoso no contato;</li>
                <li><strong>Número de telefone/WhatsApp:</strong> Para início do atendimento e envio de orientações preliminares;</li>
                <li><strong>Assunto / Tipo de Serviço:</strong> Para direcionar a análise jurídica ao benefício ou situação correspondente.</li>
              </ul>
              <p>
                <strong>Minimização de Dados:</strong> Não solicitamos CPF, RG, dados bancários, laudos médicos ou comprovantes através deste formulário inicial. Tais documentos, se necessários, serão requeridos exclusivamente em ambiente seguro e reservado durante a consulta individual.
              </p>
            </section>

            <section className={styles.section}>
              <h2>3. Base Legal para o Tratamento (Art. 7º, I, LGPD)</h2>
              <p>
                O tratamento de seus dados pessoais fundamenta-se no <strong>Consentimento do Titular</strong> (Artigo 7º, inciso I da Lei Geral de Proteção de Dados - Lei Federal nº 13.709/2018), manifestado livre e expressamente ao preencher e submeter o formulário de contato.
              </p>
            </section>

            <section className={styles.section}>
              <h2>4. Armazenamento e Compartilhamento</h2>
              <p>
                Os dados fornecidos são armazenados em planilha operacional protegida (Google Sheets) via automação de integração (Make) para registro da lista de atendimentos e controle de retorno.
              </p>
              <p>
                <strong>Garantia de Não Comercialização:</strong> Seus dados jamais serão vendidos, alugados, cedidos ou compartilhados com terceiros para finalidades de marketing ou publicidade.
              </p>
            </section>

            <section className={styles.section}>
              <h2>5. Tecnologias de Métricas e Anúncios</h2>
              <p>
                Utilizamos ferramentas de análise de tráfego (Google Tag Manager e Google Analytics) para mensurar o desempenho de nossos anúncios no Google Ads. <strong>Nenhum dado pessoal identificável (nome ou telefone) é enviado às plataformas de anúncios ou analíticas.</strong> Apenas identificadores pseudônimos e anônimos são utilizados para fins estatísticos.
              </p>
            </section>

            <section className={styles.section}>
              <h2>6. Direitos do Titular de Dados</h2>
              <p>
                A qualquer momento, você possui o direito de:
              </p>
              <ul>
                <li>Confirmar a existência de tratamento de seus dados;</li>
                <li>Solicitar a correção de dados incompletos ou inexatos;</li>
                <li>Solicitar a exclusão definitiva de seus dados de nossos registros de contato;</li>
                <li>Revogar seu consentimento.</li>
              </ul>
              <p>
                Para exercer qualquer um desses direitos, basta enviar uma mensagem pelo próprio WhatsApp de atendimento ou contatar através do e-mail: <code>{SITE_CONFIG.contact.email}</code>.
              </p>
            </section>

            <section className={styles.section}>
              <h2>7. Alterações a Esta Política</h2>
              <p>
                Esta política poderá ser atualizada periodicamente para refletir aprimoramentos técnicos ou regulatórios. A data da última versão sempre constará no topo desta página.
              </p>
            </section>

            <div className={styles.footerAction}>
              <Link href="/" className={styles.primaryBtn}>
                Retornar à página principal
              </Link>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
