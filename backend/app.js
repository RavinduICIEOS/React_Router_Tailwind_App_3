import fs from 'node:fs/promises';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

app.get('/meals', async (req, res) => {
  try {
    const meals = await fs.readFile('./data/available-meals.json', 'utf8');
    res.json(JSON.parse(meals));
  } catch (err) {
    res.status(500).json({ message: 'Failed to read meals.' });
  }
});

app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  if (orderData === null || orderData.items === null || orderData.items.length === 0) {
    return res
      .status(400)
      .json({ message: 'Missing data.' });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes('@') ||
    orderData.customer.firstname === null ||
    orderData.customer.firstname.trim() === '' ||
    orderData.customer.lastname === null ||
    orderData.customer.lastname.trim() === '' ||
    orderData.customer.phone === null ||
    orderData.customer.phone.trim() === '' || 
    orderData.customer.streetaddress === null ||
    orderData.customer.streetaddress.trim() === '' ||
    orderData.customer['postal-code'] === null ||
    orderData.customer['postal-code'].trim() === '' ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ''
  ) {
    return res.status(400).json({
      message:
        'Missing or invalid data: Email, first name, last name, or phone number is missing or incorrect.',
    });
  }
  

  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };
  let allOrders = [];
  try {
    const orders = await fs.readFile('./data/orders.json', 'utf8');
    if (orders.trim()) {
      allOrders = JSON.parse(orders);
    }
  } catch (error) {
    console.error('Error reading orders.json:', error);
    return res.status(500).json({ message: 'Server error. Could not read orders.' });
  }

  allOrders.push(newOrder);
  
  try {
    await fs.writeFile('./data/orders.json', JSON.stringify(allOrders, null, 2)); 
    res.status(201).json({ message: 'Order created!' });
  } catch (error) {
    console.error('Error writing to orders.json:', error);
    res.status(500).json({ message: 'Server error. Could not save order.' });
  }
});

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  res.status(404).json({ message: 'Not found' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});