/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2016 Da Shang <derekshang07@gmail.com>
 */

export function numericId(len) {
  const max = Math.pow(10, len)-1,
    min = Math.pow(10, len-1);

  const number = Math.random() * (max - min) + min;
  return Math.floor(number);
}
