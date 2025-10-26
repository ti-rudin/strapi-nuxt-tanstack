interface User {
  id: number;
  username?: string;
  email?: string;
  jwt?: string;
}

export const useAuth = () => {
  // Use useState instead of ref for global state sharing
  const localUser = useState<User | null>('auth.user', () => null);
  const strapiAuth = useStrapiAuth();

  const login = async (identifier: string, password: string) => {
    try {
      const response = await strapiAuth.login({ identifier, password });
      
      // Store user and jwt from response
      const userData = response.user.value;
      if (userData) {
        localUser.value = {
          id: userData.id,
          username: userData.username || '',
          email: userData.email || '',
        jwt: response.jwt,
      };
      }

      return { success: true, user: userData };
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Проверяем ошибки подключения
      if (error.code === 'ECONNREFUSED' || error.message?.includes('fetch')) {
        return { success: false, error: 'Не удается подключиться к серверу. Проверьте, запущен ли Strapi на порту 1337' };
      }
      
      return { success: false, error: error.data?.error?.message || error.message || 'Ошибка входа' };
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await strapiAuth.register({ username, email, password });
      
      // Store user and jwt from response
      const userData = response.user.value;
      if (userData) {
        localUser.value = {
          id: userData.id,
          username: userData.username || '',
          email: userData.email || '',
        jwt: response.jwt,
      };
      }

      return { success: true, user: userData };
    } catch (error: any) {
      console.error('Register error:', error);
      
      // Проверяем ошибки подключения
      if (error.code === 'ECONNREFUSED' || error.message?.includes('fetch')) {
        return { success: false, error: 'Не удается подключиться к серверу. Проверьте, запущен ли Strapi на порту 1337' };
      }
      
      return { success: false, error: error.data?.error?.message || error.message || 'Ошибка регистрации' };
    }
  };

  const logout = () => {
    strapiAuth.logout();
    localUser.value = null;
  };

  const initAuth = async () => {
    try {
      const userRef = await strapiAuth.fetchUser();
      const userData = userRef.value;
      if (userData) {
        localUser.value = {
          id: userData.id,
          username: userData.username || '',
          email: userData.email || '',
        };
      }
    } catch (error) {
      console.error('Error initializing auth', error);
      localUser.value = null;
    }
  };

  const isAuthenticated = computed(() => !!localUser.value);

  return {
    user: localUser,
    isAuthenticated,
    login,
    register,
    logout,
    initAuth,
  };
};

