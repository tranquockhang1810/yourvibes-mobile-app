import { NewFeedResponseModel } from "@/src/api/features/newFeed/Model/NewFeedModel";
import { NewFeedRepo } from "@/src/api/features/newFeed/NewFeedRepo"
import { useState } from "react";
import Toast from "react-native-toast-message";

const HomeViewModel = (repo: NewFeedRepo) => {
  const [newFeeds, setNewFeeds] = useState<NewFeedResponseModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const fetchNewFeeds = async (newPage: number = 1) => {
    try {
      setLoading(true);
      const response = await repo.getNewFeed({
        page: newPage,
        limit: limit,
      });

      if (!response?.error) {
        if (newPage === 1) {
          setNewFeeds(response?.data || []);
        } else {
          setNewFeeds((prevNewFeeds) => [...prevNewFeeds, ...response?.data || []]);
        }
        const { page: currentPage, limit: currentLimit, total: totalRecords } = response?.paging;

        setTotal(totalRecords);
        setPage(currentPage);
        setHasMore(currentPage * currentLimit < totalRecords);
      } else {
        Toast.show({
          type: 'error',
          text1: "Get NewFeeds Failed",
          text2: response?.error?.message,
        });
      }
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: "Get NewFeeds Failed catch",
        text2: error?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMoreNewFeeds = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
      fetchNewFeeds(page + 1);
    }
  };

  return {
    newFeeds,
    loading,
    fetchNewFeeds,
    loadMoreNewFeeds,
  }
}

export default HomeViewModel