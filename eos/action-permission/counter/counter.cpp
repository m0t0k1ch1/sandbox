#include "counter.hpp"

using namespace eosio;

void counter::increment(
  name me
) {
  require_auth(me);

  auto count_itr = counts.find(me.value);
  if (count_itr == counts.end()) {
    counts.emplace(_self, [&](auto& row) {
      row.key = me;
      row.val = 1;
    });
  }
  else {
    counts.modify(count_itr, _self, [&](auto& row) {
      row.val++;
    });
  }
}
