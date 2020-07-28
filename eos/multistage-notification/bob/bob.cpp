#include "bob.hpp"

void bob::ping()
{
  print("[bob] pong");
}

void bob::onnotify(
  const name& target
) {
  print_f("[bob] first_receiver: %, target: %\n", get_first_receiver(), target);

  action(
    permission_level{get_self(), name("active")},
    name("notifytest12"),
    name("notify"),
    std::make_tuple(name("motokichi111"))
  ).send();
}
