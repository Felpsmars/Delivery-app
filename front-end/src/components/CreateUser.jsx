const CreateUser = () => {
    const [names, setNames] = useState('');
    const [emails, setEmails] = useState('');
    const [passwords, setPasswords] = useState('');
    

  
    const create = (name, email, password) => {
      try {
        axios.post('link aqui',
          name, email, password )
          
        alert('Contato criado com sucesso!');
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleClick = (e) => {
      e.preventDefault();
      
  
      create(names, emails, passwords);
    };
  
    return (
  
      <>
        <form className="create-form">
  
          <label htmlFor="name" className="create-label">
            Nome:
            <input
              type="text"
              name="senha"
              className="create-name"
              data-testid="password-input"
              value={ names }
              onChange={ ({ target: { value } }) => setNames(value) }
              placeholder="Digite o nome"
              required="true"
            />
          </label>
  
          <div className="input-create">
            <label htmlFor="mobile" className="create-label">
              Email:
              <input
                type="text"
                name="mobile"
                data-testid="password-input"
                value={ setEmails }
                className="create-mobile"
                onChange={ ({ target: { value } }) => setEmails(value) }
                placeholder="Digite o email"
                required="true"
              />
            </label>
  
            <label htmlFor="email" className="create-label">
              Password:
              <input
                type="text"
                name="email"
                data-testid="email-input"
                className="create-email"
                value={ emails }
                onChange={ ({ target: { value } }) => setEmails(value) }
                placeholder="Digite a senha"
                required="true"
              />
            </label>
          </div>
          <button
            type="submit"
            onClick={ handleClick }
            className="create-button"
  
          >
            Cadastrar contato
          </button>
  
        </form>
  
      </>
    );
  };
  
  export default CreateContact;