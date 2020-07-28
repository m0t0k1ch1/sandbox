#include "notifier.hpp"

using namespace eosio;

void notifier::notify(
  const name& target
) {
  print_f("[notifier] first_receiver: %\n", get_first_receiver());
  require_recipient(target);
}
