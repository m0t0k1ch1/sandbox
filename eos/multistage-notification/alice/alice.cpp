#include "alice.hpp"

void alice::ping()
{
  print("[alice] pong");
}

void alice::onnotify(
  const name& target
) {
  print_f("[alice] first_receiver: %, target: %\n", get_first_receiver(), target);
}
