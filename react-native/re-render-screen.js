// PRECISO RENDERIZAR NOVAMENTE UMA FUNÇÃO NESTA TELA   
// EXECUTA APENAS UMA VEZ QUANDO FOCUS NA TELA E NÃO FICA DANDO LOOP

useEffect(() => {
      const reexecutar = navigation.addListener('focus', () => {
        getMenu() //aqui é o nome da função a ser executada novamente
      });
  
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    }, [reexecutar]);

/// SOMENTE PARA EXPLICAR O CONTEXTO
  useEffect(() => {
      async function get() {
        await getMenu()
      }
      get();

      return () => {
        getMenu()
    }
