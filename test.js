import http from 'http';
import assert from 'assert';
import app from './app.js';  // Your Express app
import session from 'supertest-session';

const server = http.createServer(app);

// Initialize a test session
const testSession = session(app);

// Test the login route

function testFailLogin() {
  return new Promise((resolve, reject) => {
    testSession
      .post('/')
      .send({ loginUser: 'shouldFail', loginPassword: 'faidAsfasdl3#' })
      .expect(400)  // Expect 200 status code
      .end((err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
  });
}

function testLogin() {
  return new Promise((resolve, reject) => {
    testSession
      .post('/')
      .send({ loginUser: 'user123', loginPassword: 'password123A#' })
      .expect(302)  // Expect 200 status code
      .end((err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
  });
}



// Test protected route after login
function testProtectedRoute() {
  return new Promise((resolve, reject) => {
    testSession
      .get('/about')
      .expect(200)  // Expect 200 status code
      .end((err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
  });
}

// Run the tests
async function runTests() {
  try {
    // Test Login Route
    const failLogin = await testFailLogin();
    console.log('Login fail test passed:', failLogin.statusCode === 400);
    const loginResponse = await testLogin();
    console.log('Login test passed:', loginResponse.statusCode === 302);
    

    // Test Protected Route
    const protectedRouteResponse = await testProtectedRoute();
    console.log('Protected route test passed:', protectedRouteResponse.statusCode === 200);
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    server.close();  // Close the server after tests
  }
}

// Start the tests
runTests();