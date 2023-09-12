# Teste Técnico Shopper - Front-end

## Sobre o projeto

### Desenvolvendo Soluções: Atualização de Preços no E-commerce

Em um cenário altamente competitivo de e-commerce, a gestão de preços atualizados se torna um elemento crucial para o sucesso de qualquer empresa. No entanto, quando estamos lidando com lojas que disponibilizam milhares de produtos, essa tarefa se torna complexa e suscetível a erros que podem ter um impacto significativo nos resultados do negócio. Foi nesse contexto desafiador que recebi a missão de criar uma ferramenta que simplificasse e aprimorasse o processo de atualização de preços.

Após minuciosas reuniões com as equipes envolvidas, foram identificados os seguintes requisitos fundamentais:

Time de Compras: Responsáveis por gerar um arquivo CSV contendo códigos de produtos e seus novos preços.

Time Financeiro: Necessidade de evitar preços de venda inferiores aos custos de aquisição, garantindo a sustentabilidade financeira.

Time de Marketing: A preocupação com o impacto nas estratégias de marketing levou à exigência de evitar reajustes superiores ou inferiores a 10% em relação aos preços atuais.

Produtos em Pacotes: Com a venda de produtos em pacotes, tornou-se essencial que a ferramenta atualizasse não apenas o preço do pacote, mas também dos componentes, de forma a manter o valor final do pacote igual à soma dos componentes.

O desenvolvimento dessa solução representa um passo significativo na simplificação de um desafio complexo, proporcionando às empresas de e-commerce uma ferramenta capaz de aprimorar a gestão de preços, a rentabilidade e a satisfação do cliente.

## Instalação

1. Clone o repositório: `git clone https://github.com/Mayconoliveyra/test-shopper-front.git`
2. Navegue até o diretório: `cd test-shopper-front`
3. Instale as dependências: `npm install`
4. Crie um arquivo .env no diretório raiz do projeto
5. Defina as variáveis de ambiente: Dentro do arquivo .env, é necessário o preenchimento de todas.

   REACT_APP_API_URL=

   <br>exemplo:
   <br>REACT_APP_API_URL=http://10.0.0.200:3030
   <br>ou
   <br>REACT_APP_API_URL=http://localhost:3030

6. Para iniciar o projeto utilize o comando `npm start`
