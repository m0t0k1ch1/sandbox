#include "test.hpp"

using namespace eosio;

void test::setnumber(
  name     me,
  uint64_t value
) {
  require_auth(me);

  auto number_itr = numbers.find(me.value);
  if (number_itr == numbers.end()) {
    numbers.emplace(_self, [&](auto& row) {
      row.key   = me;
      row.value = value;
    });
  }
  else {
    numbers.modify(number_itr, _self, [&](auto& row) {
      row.value = value;
    });
  }
}
