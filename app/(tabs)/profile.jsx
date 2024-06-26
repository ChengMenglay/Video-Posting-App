import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import { getUserPosts, searchPosts, signOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import { router } from "expo-router";
const Profile = () => {
  const { user, setUser, setIsLoggIn } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggIn(false);
    router.replace("/sign-in");
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 relative">
            <TouchableOpacity
              activeOpacity={0.7}
              className="items-end w-full mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View className="mt-7 flex-col items-center ">
              <View className="w-[65px] h-[65px] border border-secondary rounded-lg mb-3">
                <Image
                  source={{ uri: user?.avatar }}
                  className="w-full h-full rounded-lg "
                  resizeMode="contain"
                />
              </View>

              <Text className="text-xl font-psemibold text-white">
                {user?.username}
              </Text>
              <View className="flex-row justify-center items-center gap-x-8 my-7">
                <View className="flex-col justify-center items-center">
                  <Text className="text-2xl text-white font-psemibold">
                    {posts.length}
                  </Text>
                  <Text className="text-lg text-[#CDCDE0]">Posts</Text>
                </View>
                <View className="flex-col items-center">
                  <Text className="text-2xl text-white font-psemibold">
                    1.2k
                  </Text>
                  <Text className="text-lg text-[#CDCDE0]">Views</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No video found for this search"
          />
        )}
      />
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Profile;
