import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://ijkhdpzfuskbtitfijvh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlqa2hkcHpmdXNrYnRpdGZpanZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE0NDczMDMsImV4cCI6MjAzNzAyMzMwM30.wUGUutqMqnGtBTsXIx4IA7SAkjrXqFfVBgsyqcUwE_s' // Clave anónima
const supabase = createClient(supabaseUrl, supabaseKey)

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('productForm');
  const productNameInput = document.getElementById('productName');
  const productTable = document.getElementById('productTable');
  const errorDiv = document.getElementById('error');

  // Function to fetch products
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      errorDiv.textContent = 'Error fetching products: ' + error.message;
    } else {
      productTable.innerHTML = `
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Created At</th>
        </tr>
      `;
      data.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${new Date(product.created_at).toLocaleString()}</td>
        `;
        productTable.appendChild(row);
      });
      errorDiv.textContent = '';
    }
  };

  // Function to add a product
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const productName = productNameInput.value;

    const { data, error } = await supabase
      .from('products')
      .insert([{ name: productName }]);

    if (error) {
      console.error('Error adding product:', error);
      errorDiv.textContent = 'Error adding product: ' + error.message;
    } else {
      productNameInput.value = '';
      fetchProducts();
    }
  });

  // Fetch products on page load
  fetchProducts();
});
