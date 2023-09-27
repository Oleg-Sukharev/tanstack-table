import axios from "axios";
import { IUser } from "@/constants/types";

const API_URL = "https://dummyjson.com/";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface UserData {
  results: IUser[];
  totalUsers: number;
}

export const userService = {
  async fetchUsersData(skip: number, pageSize: number, pageFilter?: string): Promise<UserData> {
    let paramStr = "";
    if (pageFilter && pageFilter.trim().length > 1) {
      paramStr = `search?q=${pageFilter}&`;
    }

    try {
      const response = await instance.get(`/users/${paramStr || "?"}skip=${skip}&limit=${pageSize}`);
      const data: UserData = {
        results: response.data.users,
        totalUsers: response.data.total,
      };

      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
