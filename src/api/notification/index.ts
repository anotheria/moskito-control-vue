import ApiService from "@/services/ApiService.ts";
import {INotification} from "@/types/notification.interface.ts";

const updateMuteStatus = async (muted: boolean): Promise<INotification> => {
    const endpoint = muted ? `/notificationSettings/mute` : `/notificationSettings/unmute`;
    const response = await ApiService.postAndReturnData(endpoint, { muted });
    return response.results;
}

export const getMuteStatus = async (): Promise<INotification> => {
    const response = await ApiService.getAndReturnData(`/notificationSettings/status`);
    return response.results;
}

export const setMuteStatus = (): Promise<INotification> => {
    return updateMuteStatus(true);
}

export const setUnmuteStatus = (): Promise<INotification> => {
    return updateMuteStatus(false);
}