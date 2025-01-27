document.getElementById('connectBank').addEventListener('click', async () => {
    const userid = 1; 
  
    try {
      
      const response = await fetch('/api/plaid/create-link-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid }),
      });
  
      const { link_token } = await response.json();
  
      
      const handler = Plaid.create({
        token: link_token,
        onSuccess: async (publicToken) => {
          
          const connectResponse = await fetch('/api/plaid/connect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ publicToken, userid }),
          });
  
          const result = await connectResponse.json();
          alert(result.message || result.error);
        },
        onExit: (err, metadata) => {
          console.error('User exited Plaid Link:', err, metadata);
        },
      });
  
      
      handler.open();
    } catch (error) {
      console.error('Error connecting to bank:', error);
      alert('Failed to connect to bank.');
    }
  });
  
  