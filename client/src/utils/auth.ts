import { JwtPayload, jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'id_token';

class AuthService {
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return true;

      const currentTime = Date.now() / 1000; // in seconds
      return decoded.exp < currentTime;
    } catch (err) {
      return true;
    }
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_KEY) || '';
  }

  login(idToken: string) {
    localStorage.setItem(TOKEN_KEY, idToken);
    window.location.assign('/board');
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    window.location.assign('/login');
  }
}

export default new AuthService();
