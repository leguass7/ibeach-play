# Gestão de torneios

1. **Gestão de Torneios e Etapas**
   - `Tournament`: Armazena informações básicas do torneio
   - `TournamentStage`: Representa cada etapa do torneio

2. **Sistema de Inscrições**
   - `Enrollment`: Gerencia inscrições, permitindo usuários cadastrados ou não
   - Campo `weight` armazena a pontuação/peso do atleta

3. **Gestão de Duplas**
   - `Team`: Representa as duplas formadas
   - Relacionamento com `Enrollment` para ambos os jogadores

4. **Grupos e Chaves**
   - `Group`: Organiza as equipes em grupos
   - `Match`: Registra as partidas e seus resultados

5. **Sistema de Ranking**
   - `PlayerRanking`: Mantém a pontuação dos atletas por categoria

**Principais relacionamentos:**

- Um torneio tem várias etapas
- Uma etapa tem várias inscrições
- Inscrições podem formar times
- Times são organizados em grupos
- Partidas são registradas entre times
- Ranking é mantido por jogador

A estrutura suporta todas as regras mencionadas e permite flexibilidade para:

- Gerenciar torneios e etapas
- Controlar inscrições
- Formar duplas (manual ou sorteio)
- Organizar grupos e chaves
- Registrar resultados
- Manter ranking dos atletas
