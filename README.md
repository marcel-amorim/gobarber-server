# Recuperação de Senha

**RF**

- O usuário deve poder recuperar sua senha informando o seu email;
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha.

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de emails deve acontecer em segundo plano (background job).

**RN**

- O link enviado por email para resetar senha deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetá-la.

# Atualização do Perfil

**RF**

- O usuário deve poder atualizar seu perfil: nome, email e senha.

**RN**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualziar sua senha, o usuário precisa confirmar sua senha.

# Painel do Prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas.

**RNF**

- Os agendamentos do prestador no dia deve ser armazenado em cache;
- As notificações do prestador devem ser aramazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io.

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar.

# Agendamento de Serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviços cadastrados;
- O usuário deve poder visualizar os dias disponíveis para agendamento de um prestador;
- O usuário deve poder listar os horários disponíveis de um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos deve estar disponíveis entre 8h às 18h (último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo.
