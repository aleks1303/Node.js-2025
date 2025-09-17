export const userService = {
  getAllUsers: async () => {
    await userRepository.getAllUsers();
  },
};
