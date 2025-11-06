import { useState } from "react";
import { View, Text, Pressable, Modal, FlatList } from "react-native";
import { useFinanceStore } from "../store/useFinanceStore";
import { CURRENCIES, Currency } from "../constants/finance";
import { Ionicons } from "@expo/vector-icons";

export default function CurrencySelector() {
  const currency = useFinanceStore(s => s.currency);
  const setCurrency = useFinanceStore(s => s.setCurrency);
  const [open, setOpen] = useState(false);

  const handleSelect = (c: Currency) => {
    setCurrency(c);
    setOpen(false);
  };

  return (
    <View>
      {/* Trigger Button */}
      <Pressable
        onPress={() => setOpen(true)}
        className="flex-row items-center px-3 py-1.5 rounded-xl bg-indigo-100"
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 1,
        }}
      >
        <Text className="text-indigo-900 font-medium mr-1">
          {currency === "USD" ? "US Dollar" : "Soles"}
        </Text>
        <Ionicons name="chevron-down" size={14} color="#1E3A8A" />
      </Pressable>

      {/* Dropdown Modal */}
      <Modal
        transparent
        visible={open}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          onPress={() => setOpen(false)}
          className="flex-1 bg-black/30 justify-center items-center"
        >
          <View className="bg-white w-3/4 rounded-2xl p-4">
            <Text className="text-gray-900 text-lg font-semibold mb-3">
              Select Currency
            </Text>

            <FlatList
              data={CURRENCIES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleSelect(item as Currency)}
                  className={`px-4 py-3 rounded-lg mb-2 ${
                    item === currency ? "bg-indigo-100" : "bg-gray-50"
                  }`}
                >
                  <Text
                    className={`text-base ${
                      item === currency
                        ? "text-indigo-700 font-semibold"
                        : "text-gray-800"
                    }`}
                  >
                    {item === "USD" ? "US Dollar" : "Soles"}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
