
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Search
 * 
 */
export type Search = $Result.DefaultSelection<Prisma.$SearchPayload>
/**
 * Model Listing
 * 
 */
export type Listing = $Result.DefaultSelection<Prisma.$ListingPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model Favorite
 * 
 */
export type Favorite = $Result.DefaultSelection<Prisma.$FavoritePayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model UserSettings
 * 
 */
export type UserSettings = $Result.DefaultSelection<Prisma.$UserSettingsPayload>
/**
 * Model PromoCode
 * 
 */
export type PromoCode = $Result.DefaultSelection<Prisma.$PromoCodePayload>
/**
 * Model PromoCodeUse
 * 
 */
export type PromoCodeUse = $Result.DefaultSelection<Prisma.$PromoCodeUsePayload>
/**
 * Model Referral
 * 
 */
export type Referral = $Result.DefaultSelection<Prisma.$ReferralPayload>
/**
 * Model AdminLog
 * 
 */
export type AdminLog = $Result.DefaultSelection<Prisma.$AdminLogPayload>
/**
 * Model ParserLog
 * 
 */
export type ParserLog = $Result.DefaultSelection<Prisma.$ParserLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Plan: {
  FREE: 'FREE',
  START: 'START',
  PRO: 'PRO',
  UNLIMITED: 'UNLIMITED'
};

export type Plan = (typeof Plan)[keyof typeof Plan]


export const SearchStatus: {
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  ERROR: 'ERROR',
  LIMITED: 'LIMITED'
};

export type SearchStatus = (typeof SearchStatus)[keyof typeof SearchStatus]


export const Platform: {
  AVITO: 'AVITO',
  CIAN: 'CIAN',
  YOULA: 'YOULA',
  AUTORU: 'AUTORU'
};

export type Platform = (typeof Platform)[keyof typeof Platform]


export const NotificationStatus: {
  SENT: 'SENT',
  QUEUED: 'QUEUED',
  FAILED: 'FAILED',
  SKIPPED: 'SKIPPED'
};

export type NotificationStatus = (typeof NotificationStatus)[keyof typeof NotificationStatus]


export const PaymentStatus: {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]

}

export type Plan = $Enums.Plan

export const Plan: typeof $Enums.Plan

export type SearchStatus = $Enums.SearchStatus

export const SearchStatus: typeof $Enums.SearchStatus

export type Platform = $Enums.Platform

export const Platform: typeof $Enums.Platform

export type NotificationStatus = $Enums.NotificationStatus

export const NotificationStatus: typeof $Enums.NotificationStatus

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.search`: Exposes CRUD operations for the **Search** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Searches
    * const searches = await prisma.search.findMany()
    * ```
    */
  get search(): Prisma.SearchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.listing`: Exposes CRUD operations for the **Listing** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Listings
    * const listings = await prisma.listing.findMany()
    * ```
    */
  get listing(): Prisma.ListingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.favorite`: Exposes CRUD operations for the **Favorite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Favorites
    * const favorites = await prisma.favorite.findMany()
    * ```
    */
  get favorite(): Prisma.FavoriteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userSettings`: Exposes CRUD operations for the **UserSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserSettings
    * const userSettings = await prisma.userSettings.findMany()
    * ```
    */
  get userSettings(): Prisma.UserSettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.promoCode`: Exposes CRUD operations for the **PromoCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PromoCodes
    * const promoCodes = await prisma.promoCode.findMany()
    * ```
    */
  get promoCode(): Prisma.PromoCodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.promoCodeUse`: Exposes CRUD operations for the **PromoCodeUse** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PromoCodeUses
    * const promoCodeUses = await prisma.promoCodeUse.findMany()
    * ```
    */
  get promoCodeUse(): Prisma.PromoCodeUseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.referral`: Exposes CRUD operations for the **Referral** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Referrals
    * const referrals = await prisma.referral.findMany()
    * ```
    */
  get referral(): Prisma.ReferralDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.adminLog`: Exposes CRUD operations for the **AdminLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminLogs
    * const adminLogs = await prisma.adminLog.findMany()
    * ```
    */
  get adminLog(): Prisma.AdminLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.parserLog`: Exposes CRUD operations for the **ParserLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ParserLogs
    * const parserLogs = await prisma.parserLog.findMany()
    * ```
    */
  get parserLog(): Prisma.ParserLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Search: 'Search',
    Listing: 'Listing',
    Payment: 'Payment',
    Favorite: 'Favorite',
    Notification: 'Notification',
    UserSettings: 'UserSettings',
    PromoCode: 'PromoCode',
    PromoCodeUse: 'PromoCodeUse',
    Referral: 'Referral',
    AdminLog: 'AdminLog',
    ParserLog: 'ParserLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "search" | "listing" | "payment" | "favorite" | "notification" | "userSettings" | "promoCode" | "promoCodeUse" | "referral" | "adminLog" | "parserLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Search: {
        payload: Prisma.$SearchPayload<ExtArgs>
        fields: Prisma.SearchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SearchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SearchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchPayload>
          }
          findFirst: {
            args: Prisma.SearchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SearchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchPayload>
          }
          findMany: {
            args: Prisma.SearchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchPayload>[]
          }
          create: {
            args: Prisma.SearchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchPayload>
          }
          createMany: {
            args: Prisma.SearchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SearchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchPayload>[]
          }
          delete: {
            args: Prisma.SearchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchPayload>
          }
          update: {
            args: Prisma.SearchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchPayload>
          }
          deleteMany: {
            args: Prisma.SearchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SearchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SearchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchPayload>[]
          }
          upsert: {
            args: Prisma.SearchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchPayload>
          }
          aggregate: {
            args: Prisma.SearchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSearch>
          }
          groupBy: {
            args: Prisma.SearchGroupByArgs<ExtArgs>
            result: $Utils.Optional<SearchGroupByOutputType>[]
          }
          count: {
            args: Prisma.SearchCountArgs<ExtArgs>
            result: $Utils.Optional<SearchCountAggregateOutputType> | number
          }
        }
      }
      Listing: {
        payload: Prisma.$ListingPayload<ExtArgs>
        fields: Prisma.ListingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ListingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ListingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          findFirst: {
            args: Prisma.ListingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ListingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          findMany: {
            args: Prisma.ListingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>[]
          }
          create: {
            args: Prisma.ListingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          createMany: {
            args: Prisma.ListingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ListingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>[]
          }
          delete: {
            args: Prisma.ListingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          update: {
            args: Prisma.ListingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          deleteMany: {
            args: Prisma.ListingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ListingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ListingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>[]
          }
          upsert: {
            args: Prisma.ListingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          aggregate: {
            args: Prisma.ListingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateListing>
          }
          groupBy: {
            args: Prisma.ListingGroupByArgs<ExtArgs>
            result: $Utils.Optional<ListingGroupByOutputType>[]
          }
          count: {
            args: Prisma.ListingCountArgs<ExtArgs>
            result: $Utils.Optional<ListingCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      Favorite: {
        payload: Prisma.$FavoritePayload<ExtArgs>
        fields: Prisma.FavoriteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FavoriteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FavoriteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          findFirst: {
            args: Prisma.FavoriteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FavoriteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          findMany: {
            args: Prisma.FavoriteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>[]
          }
          create: {
            args: Prisma.FavoriteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          createMany: {
            args: Prisma.FavoriteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FavoriteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>[]
          }
          delete: {
            args: Prisma.FavoriteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          update: {
            args: Prisma.FavoriteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          deleteMany: {
            args: Prisma.FavoriteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FavoriteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FavoriteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>[]
          }
          upsert: {
            args: Prisma.FavoriteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          aggregate: {
            args: Prisma.FavoriteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFavorite>
          }
          groupBy: {
            args: Prisma.FavoriteGroupByArgs<ExtArgs>
            result: $Utils.Optional<FavoriteGroupByOutputType>[]
          }
          count: {
            args: Prisma.FavoriteCountArgs<ExtArgs>
            result: $Utils.Optional<FavoriteCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      UserSettings: {
        payload: Prisma.$UserSettingsPayload<ExtArgs>
        fields: Prisma.UserSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>
          }
          findFirst: {
            args: Prisma.UserSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>
          }
          findMany: {
            args: Prisma.UserSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>[]
          }
          create: {
            args: Prisma.UserSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>
          }
          createMany: {
            args: Prisma.UserSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>[]
          }
          delete: {
            args: Prisma.UserSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>
          }
          update: {
            args: Prisma.UserSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>
          }
          deleteMany: {
            args: Prisma.UserSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserSettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>[]
          }
          upsert: {
            args: Prisma.UserSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>
          }
          aggregate: {
            args: Prisma.UserSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserSettings>
          }
          groupBy: {
            args: Prisma.UserSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<UserSettingsCountAggregateOutputType> | number
          }
        }
      }
      PromoCode: {
        payload: Prisma.$PromoCodePayload<ExtArgs>
        fields: Prisma.PromoCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PromoCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PromoCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload>
          }
          findFirst: {
            args: Prisma.PromoCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PromoCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload>
          }
          findMany: {
            args: Prisma.PromoCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload>[]
          }
          create: {
            args: Prisma.PromoCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload>
          }
          createMany: {
            args: Prisma.PromoCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PromoCodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload>[]
          }
          delete: {
            args: Prisma.PromoCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload>
          }
          update: {
            args: Prisma.PromoCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload>
          }
          deleteMany: {
            args: Prisma.PromoCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PromoCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PromoCodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload>[]
          }
          upsert: {
            args: Prisma.PromoCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload>
          }
          aggregate: {
            args: Prisma.PromoCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePromoCode>
          }
          groupBy: {
            args: Prisma.PromoCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<PromoCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.PromoCodeCountArgs<ExtArgs>
            result: $Utils.Optional<PromoCodeCountAggregateOutputType> | number
          }
        }
      }
      PromoCodeUse: {
        payload: Prisma.$PromoCodeUsePayload<ExtArgs>
        fields: Prisma.PromoCodeUseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PromoCodeUseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodeUsePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PromoCodeUseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodeUsePayload>
          }
          findFirst: {
            args: Prisma.PromoCodeUseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodeUsePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PromoCodeUseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodeUsePayload>
          }
          findMany: {
            args: Prisma.PromoCodeUseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodeUsePayload>[]
          }
          create: {
            args: Prisma.PromoCodeUseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodeUsePayload>
          }
          createMany: {
            args: Prisma.PromoCodeUseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PromoCodeUseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodeUsePayload>[]
          }
          delete: {
            args: Prisma.PromoCodeUseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodeUsePayload>
          }
          update: {
            args: Prisma.PromoCodeUseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodeUsePayload>
          }
          deleteMany: {
            args: Prisma.PromoCodeUseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PromoCodeUseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PromoCodeUseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodeUsePayload>[]
          }
          upsert: {
            args: Prisma.PromoCodeUseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodeUsePayload>
          }
          aggregate: {
            args: Prisma.PromoCodeUseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePromoCodeUse>
          }
          groupBy: {
            args: Prisma.PromoCodeUseGroupByArgs<ExtArgs>
            result: $Utils.Optional<PromoCodeUseGroupByOutputType>[]
          }
          count: {
            args: Prisma.PromoCodeUseCountArgs<ExtArgs>
            result: $Utils.Optional<PromoCodeUseCountAggregateOutputType> | number
          }
        }
      }
      Referral: {
        payload: Prisma.$ReferralPayload<ExtArgs>
        fields: Prisma.ReferralFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReferralFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReferralFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>
          }
          findFirst: {
            args: Prisma.ReferralFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReferralFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>
          }
          findMany: {
            args: Prisma.ReferralFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>[]
          }
          create: {
            args: Prisma.ReferralCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>
          }
          createMany: {
            args: Prisma.ReferralCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReferralCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>[]
          }
          delete: {
            args: Prisma.ReferralDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>
          }
          update: {
            args: Prisma.ReferralUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>
          }
          deleteMany: {
            args: Prisma.ReferralDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReferralUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReferralUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>[]
          }
          upsert: {
            args: Prisma.ReferralUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>
          }
          aggregate: {
            args: Prisma.ReferralAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReferral>
          }
          groupBy: {
            args: Prisma.ReferralGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReferralGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReferralCountArgs<ExtArgs>
            result: $Utils.Optional<ReferralCountAggregateOutputType> | number
          }
        }
      }
      AdminLog: {
        payload: Prisma.$AdminLogPayload<ExtArgs>
        fields: Prisma.AdminLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminLogPayload>
          }
          findFirst: {
            args: Prisma.AdminLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminLogPayload>
          }
          findMany: {
            args: Prisma.AdminLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminLogPayload>[]
          }
          create: {
            args: Prisma.AdminLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminLogPayload>
          }
          createMany: {
            args: Prisma.AdminLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminLogPayload>[]
          }
          delete: {
            args: Prisma.AdminLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminLogPayload>
          }
          update: {
            args: Prisma.AdminLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminLogPayload>
          }
          deleteMany: {
            args: Prisma.AdminLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminLogPayload>[]
          }
          upsert: {
            args: Prisma.AdminLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminLogPayload>
          }
          aggregate: {
            args: Prisma.AdminLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminLog>
          }
          groupBy: {
            args: Prisma.AdminLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminLogCountArgs<ExtArgs>
            result: $Utils.Optional<AdminLogCountAggregateOutputType> | number
          }
        }
      }
      ParserLog: {
        payload: Prisma.$ParserLogPayload<ExtArgs>
        fields: Prisma.ParserLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ParserLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParserLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ParserLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParserLogPayload>
          }
          findFirst: {
            args: Prisma.ParserLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParserLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ParserLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParserLogPayload>
          }
          findMany: {
            args: Prisma.ParserLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParserLogPayload>[]
          }
          create: {
            args: Prisma.ParserLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParserLogPayload>
          }
          createMany: {
            args: Prisma.ParserLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ParserLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParserLogPayload>[]
          }
          delete: {
            args: Prisma.ParserLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParserLogPayload>
          }
          update: {
            args: Prisma.ParserLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParserLogPayload>
          }
          deleteMany: {
            args: Prisma.ParserLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ParserLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ParserLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParserLogPayload>[]
          }
          upsert: {
            args: Prisma.ParserLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParserLogPayload>
          }
          aggregate: {
            args: Prisma.ParserLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParserLog>
          }
          groupBy: {
            args: Prisma.ParserLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ParserLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ParserLogCountArgs<ExtArgs>
            result: $Utils.Optional<ParserLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    search?: SearchOmit
    listing?: ListingOmit
    payment?: PaymentOmit
    favorite?: FavoriteOmit
    notification?: NotificationOmit
    userSettings?: UserSettingsOmit
    promoCode?: PromoCodeOmit
    promoCodeUse?: PromoCodeUseOmit
    referral?: ReferralOmit
    adminLog?: AdminLogOmit
    parserLog?: ParserLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    referrals: number
    searches: number
    payments: number
    favorites: number
    notifications: number
    adminLogs: number
    sentReferrals: number
    promoUses: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    referrals?: boolean | UserCountOutputTypeCountReferralsArgs
    searches?: boolean | UserCountOutputTypeCountSearchesArgs
    payments?: boolean | UserCountOutputTypeCountPaymentsArgs
    favorites?: boolean | UserCountOutputTypeCountFavoritesArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
    adminLogs?: boolean | UserCountOutputTypeCountAdminLogsArgs
    sentReferrals?: boolean | UserCountOutputTypeCountSentReferralsArgs
    promoUses?: boolean | UserCountOutputTypeCountPromoUsesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReferralsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSearchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SearchWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAdminLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSentReferralsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReferralWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPromoUsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PromoCodeUseWhereInput
  }


  /**
   * Count Type SearchCountOutputType
   */

  export type SearchCountOutputType = {
    listings: number
    notifications: number
  }

  export type SearchCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listings?: boolean | SearchCountOutputTypeCountListingsArgs
    notifications?: boolean | SearchCountOutputTypeCountNotificationsArgs
  }

  // Custom InputTypes
  /**
   * SearchCountOutputType without action
   */
  export type SearchCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchCountOutputType
     */
    select?: SearchCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SearchCountOutputType without action
   */
  export type SearchCountOutputTypeCountListingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingWhereInput
  }

  /**
   * SearchCountOutputType without action
   */
  export type SearchCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }


  /**
   * Count Type ListingCountOutputType
   */

  export type ListingCountOutputType = {
    notifications: number
    favorites: number
  }

  export type ListingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notifications?: boolean | ListingCountOutputTypeCountNotificationsArgs
    favorites?: boolean | ListingCountOutputTypeCountFavoritesArgs
  }

  // Custom InputTypes
  /**
   * ListingCountOutputType without action
   */
  export type ListingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingCountOutputType
     */
    select?: ListingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ListingCountOutputType without action
   */
  export type ListingCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * ListingCountOutputType without action
   */
  export type ListingCountOutputTypeCountFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteWhereInput
  }


  /**
   * Count Type PromoCodeCountOutputType
   */

  export type PromoCodeCountOutputType = {
    uses: number
  }

  export type PromoCodeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uses?: boolean | PromoCodeCountOutputTypeCountUsesArgs
  }

  // Custom InputTypes
  /**
   * PromoCodeCountOutputType without action
   */
  export type PromoCodeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeCountOutputType
     */
    select?: PromoCodeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PromoCodeCountOutputType without action
   */
  export type PromoCodeCountOutputTypeCountUsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PromoCodeUseWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    telegramId: number | null
    dailyNotificationCount: number | null
    referredByUserId: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    telegramId: bigint | null
    dailyNotificationCount: number | null
    referredByUserId: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    telegramId: bigint | null
    username: string | null
    firstName: string | null
    lastName: string | null
    plan: $Enums.Plan | null
    subscriptionUntil: Date | null
    isBanned: boolean | null
    banReason: string | null
    dailyNotificationCount: number | null
    dailyNotificationLimitResetAt: Date | null
    limitNotifiedAt: Date | null
    trialStartedAt: Date | null
    trialEndsAt: Date | null
    trialUsed: boolean | null
    referredByUserId: number | null
    createdAt: Date | null
    updatedAt: Date | null
    lastActiveAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    telegramId: bigint | null
    username: string | null
    firstName: string | null
    lastName: string | null
    plan: $Enums.Plan | null
    subscriptionUntil: Date | null
    isBanned: boolean | null
    banReason: string | null
    dailyNotificationCount: number | null
    dailyNotificationLimitResetAt: Date | null
    limitNotifiedAt: Date | null
    trialStartedAt: Date | null
    trialEndsAt: Date | null
    trialUsed: boolean | null
    referredByUserId: number | null
    createdAt: Date | null
    updatedAt: Date | null
    lastActiveAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    telegramId: number
    username: number
    firstName: number
    lastName: number
    plan: number
    subscriptionUntil: number
    isBanned: number
    banReason: number
    dailyNotificationCount: number
    dailyNotificationLimitResetAt: number
    limitNotifiedAt: number
    trialStartedAt: number
    trialEndsAt: number
    trialUsed: number
    referredByUserId: number
    createdAt: number
    updatedAt: number
    lastActiveAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    telegramId?: true
    dailyNotificationCount?: true
    referredByUserId?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    telegramId?: true
    dailyNotificationCount?: true
    referredByUserId?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    telegramId?: true
    username?: true
    firstName?: true
    lastName?: true
    plan?: true
    subscriptionUntil?: true
    isBanned?: true
    banReason?: true
    dailyNotificationCount?: true
    dailyNotificationLimitResetAt?: true
    limitNotifiedAt?: true
    trialStartedAt?: true
    trialEndsAt?: true
    trialUsed?: true
    referredByUserId?: true
    createdAt?: true
    updatedAt?: true
    lastActiveAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    telegramId?: true
    username?: true
    firstName?: true
    lastName?: true
    plan?: true
    subscriptionUntil?: true
    isBanned?: true
    banReason?: true
    dailyNotificationCount?: true
    dailyNotificationLimitResetAt?: true
    limitNotifiedAt?: true
    trialStartedAt?: true
    trialEndsAt?: true
    trialUsed?: true
    referredByUserId?: true
    createdAt?: true
    updatedAt?: true
    lastActiveAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    telegramId?: true
    username?: true
    firstName?: true
    lastName?: true
    plan?: true
    subscriptionUntil?: true
    isBanned?: true
    banReason?: true
    dailyNotificationCount?: true
    dailyNotificationLimitResetAt?: true
    limitNotifiedAt?: true
    trialStartedAt?: true
    trialEndsAt?: true
    trialUsed?: true
    referredByUserId?: true
    createdAt?: true
    updatedAt?: true
    lastActiveAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    telegramId: bigint
    username: string | null
    firstName: string | null
    lastName: string | null
    plan: $Enums.Plan
    subscriptionUntil: Date | null
    isBanned: boolean
    banReason: string | null
    dailyNotificationCount: number
    dailyNotificationLimitResetAt: Date
    limitNotifiedAt: Date | null
    trialStartedAt: Date | null
    trialEndsAt: Date | null
    trialUsed: boolean
    referredByUserId: number | null
    createdAt: Date
    updatedAt: Date
    lastActiveAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    username?: boolean
    firstName?: boolean
    lastName?: boolean
    plan?: boolean
    subscriptionUntil?: boolean
    isBanned?: boolean
    banReason?: boolean
    dailyNotificationCount?: boolean
    dailyNotificationLimitResetAt?: boolean
    limitNotifiedAt?: boolean
    trialStartedAt?: boolean
    trialEndsAt?: boolean
    trialUsed?: boolean
    referredByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastActiveAt?: boolean
    referredBy?: boolean | User$referredByArgs<ExtArgs>
    referrals?: boolean | User$referralsArgs<ExtArgs>
    searches?: boolean | User$searchesArgs<ExtArgs>
    payments?: boolean | User$paymentsArgs<ExtArgs>
    favorites?: boolean | User$favoritesArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    settings?: boolean | User$settingsArgs<ExtArgs>
    adminLogs?: boolean | User$adminLogsArgs<ExtArgs>
    sentReferrals?: boolean | User$sentReferralsArgs<ExtArgs>
    gotReferral?: boolean | User$gotReferralArgs<ExtArgs>
    promoUses?: boolean | User$promoUsesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    username?: boolean
    firstName?: boolean
    lastName?: boolean
    plan?: boolean
    subscriptionUntil?: boolean
    isBanned?: boolean
    banReason?: boolean
    dailyNotificationCount?: boolean
    dailyNotificationLimitResetAt?: boolean
    limitNotifiedAt?: boolean
    trialStartedAt?: boolean
    trialEndsAt?: boolean
    trialUsed?: boolean
    referredByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastActiveAt?: boolean
    referredBy?: boolean | User$referredByArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    username?: boolean
    firstName?: boolean
    lastName?: boolean
    plan?: boolean
    subscriptionUntil?: boolean
    isBanned?: boolean
    banReason?: boolean
    dailyNotificationCount?: boolean
    dailyNotificationLimitResetAt?: boolean
    limitNotifiedAt?: boolean
    trialStartedAt?: boolean
    trialEndsAt?: boolean
    trialUsed?: boolean
    referredByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastActiveAt?: boolean
    referredBy?: boolean | User$referredByArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    telegramId?: boolean
    username?: boolean
    firstName?: boolean
    lastName?: boolean
    plan?: boolean
    subscriptionUntil?: boolean
    isBanned?: boolean
    banReason?: boolean
    dailyNotificationCount?: boolean
    dailyNotificationLimitResetAt?: boolean
    limitNotifiedAt?: boolean
    trialStartedAt?: boolean
    trialEndsAt?: boolean
    trialUsed?: boolean
    referredByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastActiveAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "telegramId" | "username" | "firstName" | "lastName" | "plan" | "subscriptionUntil" | "isBanned" | "banReason" | "dailyNotificationCount" | "dailyNotificationLimitResetAt" | "limitNotifiedAt" | "trialStartedAt" | "trialEndsAt" | "trialUsed" | "referredByUserId" | "createdAt" | "updatedAt" | "lastActiveAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    referredBy?: boolean | User$referredByArgs<ExtArgs>
    referrals?: boolean | User$referralsArgs<ExtArgs>
    searches?: boolean | User$searchesArgs<ExtArgs>
    payments?: boolean | User$paymentsArgs<ExtArgs>
    favorites?: boolean | User$favoritesArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    settings?: boolean | User$settingsArgs<ExtArgs>
    adminLogs?: boolean | User$adminLogsArgs<ExtArgs>
    sentReferrals?: boolean | User$sentReferralsArgs<ExtArgs>
    gotReferral?: boolean | User$gotReferralArgs<ExtArgs>
    promoUses?: boolean | User$promoUsesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    referredBy?: boolean | User$referredByArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    referredBy?: boolean | User$referredByArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      referredBy: Prisma.$UserPayload<ExtArgs> | null
      referrals: Prisma.$UserPayload<ExtArgs>[]
      searches: Prisma.$SearchPayload<ExtArgs>[]
      payments: Prisma.$PaymentPayload<ExtArgs>[]
      favorites: Prisma.$FavoritePayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      settings: Prisma.$UserSettingsPayload<ExtArgs> | null
      adminLogs: Prisma.$AdminLogPayload<ExtArgs>[]
      sentReferrals: Prisma.$ReferralPayload<ExtArgs>[]
      gotReferral: Prisma.$ReferralPayload<ExtArgs> | null
      promoUses: Prisma.$PromoCodeUsePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      telegramId: bigint
      username: string | null
      firstName: string | null
      lastName: string | null
      plan: $Enums.Plan
      subscriptionUntil: Date | null
      isBanned: boolean
      banReason: string | null
      dailyNotificationCount: number
      dailyNotificationLimitResetAt: Date
      limitNotifiedAt: Date | null
      trialStartedAt: Date | null
      trialEndsAt: Date | null
      trialUsed: boolean
      referredByUserId: number | null
      createdAt: Date
      updatedAt: Date
      lastActiveAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    referredBy<T extends User$referredByArgs<ExtArgs> = {}>(args?: Subset<T, User$referredByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    referrals<T extends User$referralsArgs<ExtArgs> = {}>(args?: Subset<T, User$referralsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    searches<T extends User$searchesArgs<ExtArgs> = {}>(args?: Subset<T, User$searchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends User$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, User$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    favorites<T extends User$favoritesArgs<ExtArgs> = {}>(args?: Subset<T, User$favoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    settings<T extends User$settingsArgs<ExtArgs> = {}>(args?: Subset<T, User$settingsArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    adminLogs<T extends User$adminLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$adminLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sentReferrals<T extends User$sentReferralsArgs<ExtArgs> = {}>(args?: Subset<T, User$sentReferralsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    gotReferral<T extends User$gotReferralArgs<ExtArgs> = {}>(args?: Subset<T, User$gotReferralArgs<ExtArgs>>): Prisma__ReferralClient<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    promoUses<T extends User$promoUsesArgs<ExtArgs> = {}>(args?: Subset<T, User$promoUsesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromoCodeUsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly telegramId: FieldRef<"User", 'BigInt'>
    readonly username: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly plan: FieldRef<"User", 'Plan'>
    readonly subscriptionUntil: FieldRef<"User", 'DateTime'>
    readonly isBanned: FieldRef<"User", 'Boolean'>
    readonly banReason: FieldRef<"User", 'String'>
    readonly dailyNotificationCount: FieldRef<"User", 'Int'>
    readonly dailyNotificationLimitResetAt: FieldRef<"User", 'DateTime'>
    readonly limitNotifiedAt: FieldRef<"User", 'DateTime'>
    readonly trialStartedAt: FieldRef<"User", 'DateTime'>
    readonly trialEndsAt: FieldRef<"User", 'DateTime'>
    readonly trialUsed: FieldRef<"User", 'Boolean'>
    readonly referredByUserId: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly lastActiveAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.referredBy
   */
  export type User$referredByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * User.referrals
   */
  export type User$referralsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User.searches
   */
  export type User$searchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Search
     */
    select?: SearchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Search
     */
    omit?: SearchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchInclude<ExtArgs> | null
    where?: SearchWhereInput
    orderBy?: SearchOrderByWithRelationInput | SearchOrderByWithRelationInput[]
    cursor?: SearchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SearchScalarFieldEnum | SearchScalarFieldEnum[]
  }

  /**
   * User.payments
   */
  export type User$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * User.favorites
   */
  export type User$favoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    where?: FavoriteWhereInput
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    cursor?: FavoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User.settings
   */
  export type User$settingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    where?: UserSettingsWhereInput
  }

  /**
   * User.adminLogs
   */
  export type User$adminLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLog
     */
    select?: AdminLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLog
     */
    omit?: AdminLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLogInclude<ExtArgs> | null
    where?: AdminLogWhereInput
    orderBy?: AdminLogOrderByWithRelationInput | AdminLogOrderByWithRelationInput[]
    cursor?: AdminLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AdminLogScalarFieldEnum | AdminLogScalarFieldEnum[]
  }

  /**
   * User.sentReferrals
   */
  export type User$sentReferralsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    where?: ReferralWhereInput
    orderBy?: ReferralOrderByWithRelationInput | ReferralOrderByWithRelationInput[]
    cursor?: ReferralWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReferralScalarFieldEnum | ReferralScalarFieldEnum[]
  }

  /**
   * User.gotReferral
   */
  export type User$gotReferralArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    where?: ReferralWhereInput
  }

  /**
   * User.promoUses
   */
  export type User$promoUsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUse
     */
    select?: PromoCodeUseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUse
     */
    omit?: PromoCodeUseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUseInclude<ExtArgs> | null
    where?: PromoCodeUseWhereInput
    orderBy?: PromoCodeUseOrderByWithRelationInput | PromoCodeUseOrderByWithRelationInput[]
    cursor?: PromoCodeUseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PromoCodeUseScalarFieldEnum | PromoCodeUseScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Search
   */

  export type AggregateSearch = {
    _count: SearchCountAggregateOutputType | null
    _avg: SearchAvgAggregateOutputType | null
    _sum: SearchSumAggregateOutputType | null
    _min: SearchMinAggregateOutputType | null
    _max: SearchMaxAggregateOutputType | null
  }

  export type SearchAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    errorCount: number | null
  }

  export type SearchSumAggregateOutputType = {
    id: number | null
    userId: number | null
    errorCount: number | null
  }

  export type SearchMinAggregateOutputType = {
    id: number | null
    userId: number | null
    name: string | null
    platform: $Enums.Platform | null
    url: string | null
    status: $Enums.SearchStatus | null
    isActive: boolean | null
    errorCount: number | null
    lastError: string | null
    lastCheckedAt: Date | null
    lastFoundAt: Date | null
    baselineInitializedAt: Date | null
    lastNewListingAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SearchMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    name: string | null
    platform: $Enums.Platform | null
    url: string | null
    status: $Enums.SearchStatus | null
    isActive: boolean | null
    errorCount: number | null
    lastError: string | null
    lastCheckedAt: Date | null
    lastFoundAt: Date | null
    baselineInitializedAt: Date | null
    lastNewListingAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SearchCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    platform: number
    url: number
    status: number
    isActive: number
    errorCount: number
    lastError: number
    lastCheckedAt: number
    lastFoundAt: number
    baselineInitializedAt: number
    lastNewListingAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SearchAvgAggregateInputType = {
    id?: true
    userId?: true
    errorCount?: true
  }

  export type SearchSumAggregateInputType = {
    id?: true
    userId?: true
    errorCount?: true
  }

  export type SearchMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    platform?: true
    url?: true
    status?: true
    isActive?: true
    errorCount?: true
    lastError?: true
    lastCheckedAt?: true
    lastFoundAt?: true
    baselineInitializedAt?: true
    lastNewListingAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SearchMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    platform?: true
    url?: true
    status?: true
    isActive?: true
    errorCount?: true
    lastError?: true
    lastCheckedAt?: true
    lastFoundAt?: true
    baselineInitializedAt?: true
    lastNewListingAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SearchCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    platform?: true
    url?: true
    status?: true
    isActive?: true
    errorCount?: true
    lastError?: true
    lastCheckedAt?: true
    lastFoundAt?: true
    baselineInitializedAt?: true
    lastNewListingAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SearchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Search to aggregate.
     */
    where?: SearchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Searches to fetch.
     */
    orderBy?: SearchOrderByWithRelationInput | SearchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SearchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Searches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Searches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Searches
    **/
    _count?: true | SearchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SearchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SearchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SearchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SearchMaxAggregateInputType
  }

  export type GetSearchAggregateType<T extends SearchAggregateArgs> = {
        [P in keyof T & keyof AggregateSearch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSearch[P]>
      : GetScalarType<T[P], AggregateSearch[P]>
  }




  export type SearchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SearchWhereInput
    orderBy?: SearchOrderByWithAggregationInput | SearchOrderByWithAggregationInput[]
    by: SearchScalarFieldEnum[] | SearchScalarFieldEnum
    having?: SearchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SearchCountAggregateInputType | true
    _avg?: SearchAvgAggregateInputType
    _sum?: SearchSumAggregateInputType
    _min?: SearchMinAggregateInputType
    _max?: SearchMaxAggregateInputType
  }

  export type SearchGroupByOutputType = {
    id: number
    userId: number
    name: string | null
    platform: $Enums.Platform
    url: string
    status: $Enums.SearchStatus
    isActive: boolean
    errorCount: number
    lastError: string | null
    lastCheckedAt: Date | null
    lastFoundAt: Date | null
    baselineInitializedAt: Date | null
    lastNewListingAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: SearchCountAggregateOutputType | null
    _avg: SearchAvgAggregateOutputType | null
    _sum: SearchSumAggregateOutputType | null
    _min: SearchMinAggregateOutputType | null
    _max: SearchMaxAggregateOutputType | null
  }

  type GetSearchGroupByPayload<T extends SearchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SearchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SearchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SearchGroupByOutputType[P]>
            : GetScalarType<T[P], SearchGroupByOutputType[P]>
        }
      >
    >


  export type SearchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    platform?: boolean
    url?: boolean
    status?: boolean
    isActive?: boolean
    errorCount?: boolean
    lastError?: boolean
    lastCheckedAt?: boolean
    lastFoundAt?: boolean
    baselineInitializedAt?: boolean
    lastNewListingAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    listings?: boolean | Search$listingsArgs<ExtArgs>
    notifications?: boolean | Search$notificationsArgs<ExtArgs>
    _count?: boolean | SearchCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["search"]>

  export type SearchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    platform?: boolean
    url?: boolean
    status?: boolean
    isActive?: boolean
    errorCount?: boolean
    lastError?: boolean
    lastCheckedAt?: boolean
    lastFoundAt?: boolean
    baselineInitializedAt?: boolean
    lastNewListingAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["search"]>

  export type SearchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    platform?: boolean
    url?: boolean
    status?: boolean
    isActive?: boolean
    errorCount?: boolean
    lastError?: boolean
    lastCheckedAt?: boolean
    lastFoundAt?: boolean
    baselineInitializedAt?: boolean
    lastNewListingAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["search"]>

  export type SearchSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    platform?: boolean
    url?: boolean
    status?: boolean
    isActive?: boolean
    errorCount?: boolean
    lastError?: boolean
    lastCheckedAt?: boolean
    lastFoundAt?: boolean
    baselineInitializedAt?: boolean
    lastNewListingAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SearchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "platform" | "url" | "status" | "isActive" | "errorCount" | "lastError" | "lastCheckedAt" | "lastFoundAt" | "baselineInitializedAt" | "lastNewListingAt" | "createdAt" | "updatedAt", ExtArgs["result"]["search"]>
  export type SearchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    listings?: boolean | Search$listingsArgs<ExtArgs>
    notifications?: boolean | Search$notificationsArgs<ExtArgs>
    _count?: boolean | SearchCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SearchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SearchIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SearchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Search"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      listings: Prisma.$ListingPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      name: string | null
      platform: $Enums.Platform
      url: string
      status: $Enums.SearchStatus
      isActive: boolean
      errorCount: number
      lastError: string | null
      lastCheckedAt: Date | null
      lastFoundAt: Date | null
      baselineInitializedAt: Date | null
      lastNewListingAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["search"]>
    composites: {}
  }

  type SearchGetPayload<S extends boolean | null | undefined | SearchDefaultArgs> = $Result.GetResult<Prisma.$SearchPayload, S>

  type SearchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SearchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SearchCountAggregateInputType | true
    }

  export interface SearchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Search'], meta: { name: 'Search' } }
    /**
     * Find zero or one Search that matches the filter.
     * @param {SearchFindUniqueArgs} args - Arguments to find a Search
     * @example
     * // Get one Search
     * const search = await prisma.search.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SearchFindUniqueArgs>(args: SelectSubset<T, SearchFindUniqueArgs<ExtArgs>>): Prisma__SearchClient<$Result.GetResult<Prisma.$SearchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Search that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SearchFindUniqueOrThrowArgs} args - Arguments to find a Search
     * @example
     * // Get one Search
     * const search = await prisma.search.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SearchFindUniqueOrThrowArgs>(args: SelectSubset<T, SearchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SearchClient<$Result.GetResult<Prisma.$SearchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Search that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchFindFirstArgs} args - Arguments to find a Search
     * @example
     * // Get one Search
     * const search = await prisma.search.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SearchFindFirstArgs>(args?: SelectSubset<T, SearchFindFirstArgs<ExtArgs>>): Prisma__SearchClient<$Result.GetResult<Prisma.$SearchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Search that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchFindFirstOrThrowArgs} args - Arguments to find a Search
     * @example
     * // Get one Search
     * const search = await prisma.search.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SearchFindFirstOrThrowArgs>(args?: SelectSubset<T, SearchFindFirstOrThrowArgs<ExtArgs>>): Prisma__SearchClient<$Result.GetResult<Prisma.$SearchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Searches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Searches
     * const searches = await prisma.search.findMany()
     * 
     * // Get first 10 Searches
     * const searches = await prisma.search.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const searchWithIdOnly = await prisma.search.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SearchFindManyArgs>(args?: SelectSubset<T, SearchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Search.
     * @param {SearchCreateArgs} args - Arguments to create a Search.
     * @example
     * // Create one Search
     * const Search = await prisma.search.create({
     *   data: {
     *     // ... data to create a Search
     *   }
     * })
     * 
     */
    create<T extends SearchCreateArgs>(args: SelectSubset<T, SearchCreateArgs<ExtArgs>>): Prisma__SearchClient<$Result.GetResult<Prisma.$SearchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Searches.
     * @param {SearchCreateManyArgs} args - Arguments to create many Searches.
     * @example
     * // Create many Searches
     * const search = await prisma.search.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SearchCreateManyArgs>(args?: SelectSubset<T, SearchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Searches and returns the data saved in the database.
     * @param {SearchCreateManyAndReturnArgs} args - Arguments to create many Searches.
     * @example
     * // Create many Searches
     * const search = await prisma.search.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Searches and only return the `id`
     * const searchWithIdOnly = await prisma.search.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SearchCreateManyAndReturnArgs>(args?: SelectSubset<T, SearchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Search.
     * @param {SearchDeleteArgs} args - Arguments to delete one Search.
     * @example
     * // Delete one Search
     * const Search = await prisma.search.delete({
     *   where: {
     *     // ... filter to delete one Search
     *   }
     * })
     * 
     */
    delete<T extends SearchDeleteArgs>(args: SelectSubset<T, SearchDeleteArgs<ExtArgs>>): Prisma__SearchClient<$Result.GetResult<Prisma.$SearchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Search.
     * @param {SearchUpdateArgs} args - Arguments to update one Search.
     * @example
     * // Update one Search
     * const search = await prisma.search.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SearchUpdateArgs>(args: SelectSubset<T, SearchUpdateArgs<ExtArgs>>): Prisma__SearchClient<$Result.GetResult<Prisma.$SearchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Searches.
     * @param {SearchDeleteManyArgs} args - Arguments to filter Searches to delete.
     * @example
     * // Delete a few Searches
     * const { count } = await prisma.search.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SearchDeleteManyArgs>(args?: SelectSubset<T, SearchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Searches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Searches
     * const search = await prisma.search.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SearchUpdateManyArgs>(args: SelectSubset<T, SearchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Searches and returns the data updated in the database.
     * @param {SearchUpdateManyAndReturnArgs} args - Arguments to update many Searches.
     * @example
     * // Update many Searches
     * const search = await prisma.search.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Searches and only return the `id`
     * const searchWithIdOnly = await prisma.search.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SearchUpdateManyAndReturnArgs>(args: SelectSubset<T, SearchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Search.
     * @param {SearchUpsertArgs} args - Arguments to update or create a Search.
     * @example
     * // Update or create a Search
     * const search = await prisma.search.upsert({
     *   create: {
     *     // ... data to create a Search
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Search we want to update
     *   }
     * })
     */
    upsert<T extends SearchUpsertArgs>(args: SelectSubset<T, SearchUpsertArgs<ExtArgs>>): Prisma__SearchClient<$Result.GetResult<Prisma.$SearchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Searches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchCountArgs} args - Arguments to filter Searches to count.
     * @example
     * // Count the number of Searches
     * const count = await prisma.search.count({
     *   where: {
     *     // ... the filter for the Searches we want to count
     *   }
     * })
    **/
    count<T extends SearchCountArgs>(
      args?: Subset<T, SearchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SearchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Search.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SearchAggregateArgs>(args: Subset<T, SearchAggregateArgs>): Prisma.PrismaPromise<GetSearchAggregateType<T>>

    /**
     * Group by Search.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SearchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SearchGroupByArgs['orderBy'] }
        : { orderBy?: SearchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SearchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSearchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Search model
   */
  readonly fields: SearchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Search.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SearchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    listings<T extends Search$listingsArgs<ExtArgs> = {}>(args?: Subset<T, Search$listingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends Search$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, Search$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Search model
   */
  interface SearchFieldRefs {
    readonly id: FieldRef<"Search", 'Int'>
    readonly userId: FieldRef<"Search", 'Int'>
    readonly name: FieldRef<"Search", 'String'>
    readonly platform: FieldRef<"Search", 'Platform'>
    readonly url: FieldRef<"Search", 'String'>
    readonly status: FieldRef<"Search", 'SearchStatus'>
    readonly isActive: FieldRef<"Search", 'Boolean'>
    readonly errorCount: FieldRef<"Search", 'Int'>
    readonly lastError: FieldRef<"Search", 'String'>
    readonly lastCheckedAt: FieldRef<"Search", 'DateTime'>
    readonly lastFoundAt: FieldRef<"Search", 'DateTime'>
    readonly baselineInitializedAt: FieldRef<"Search", 'DateTime'>
    readonly lastNewListingAt: FieldRef<"Search", 'DateTime'>
    readonly createdAt: FieldRef<"Search", 'DateTime'>
    readonly updatedAt: FieldRef<"Search", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Search findUnique
   */
  export type SearchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Search
     */
    select?: SearchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Search
     */
    omit?: SearchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchInclude<ExtArgs> | null
    /**
     * Filter, which Search to fetch.
     */
    where: SearchWhereUniqueInput
  }

  /**
   * Search findUniqueOrThrow
   */
  export type SearchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Search
     */
    select?: SearchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Search
     */
    omit?: SearchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchInclude<ExtArgs> | null
    /**
     * Filter, which Search to fetch.
     */
    where: SearchWhereUniqueInput
  }

  /**
   * Search findFirst
   */
  export type SearchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Search
     */
    select?: SearchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Search
     */
    omit?: SearchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchInclude<ExtArgs> | null
    /**
     * Filter, which Search to fetch.
     */
    where?: SearchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Searches to fetch.
     */
    orderBy?: SearchOrderByWithRelationInput | SearchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Searches.
     */
    cursor?: SearchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Searches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Searches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Searches.
     */
    distinct?: SearchScalarFieldEnum | SearchScalarFieldEnum[]
  }

  /**
   * Search findFirstOrThrow
   */
  export type SearchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Search
     */
    select?: SearchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Search
     */
    omit?: SearchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchInclude<ExtArgs> | null
    /**
     * Filter, which Search to fetch.
     */
    where?: SearchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Searches to fetch.
     */
    orderBy?: SearchOrderByWithRelationInput | SearchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Searches.
     */
    cursor?: SearchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Searches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Searches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Searches.
     */
    distinct?: SearchScalarFieldEnum | SearchScalarFieldEnum[]
  }

  /**
   * Search findMany
   */
  export type SearchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Search
     */
    select?: SearchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Search
     */
    omit?: SearchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchInclude<ExtArgs> | null
    /**
     * Filter, which Searches to fetch.
     */
    where?: SearchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Searches to fetch.
     */
    orderBy?: SearchOrderByWithRelationInput | SearchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Searches.
     */
    cursor?: SearchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Searches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Searches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Searches.
     */
    distinct?: SearchScalarFieldEnum | SearchScalarFieldEnum[]
  }

  /**
   * Search create
   */
  export type SearchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Search
     */
    select?: SearchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Search
     */
    omit?: SearchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchInclude<ExtArgs> | null
    /**
     * The data needed to create a Search.
     */
    data: XOR<SearchCreateInput, SearchUncheckedCreateInput>
  }

  /**
   * Search createMany
   */
  export type SearchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Searches.
     */
    data: SearchCreateManyInput | SearchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Search createManyAndReturn
   */
  export type SearchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Search
     */
    select?: SearchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Search
     */
    omit?: SearchOmit<ExtArgs> | null
    /**
     * The data used to create many Searches.
     */
    data: SearchCreateManyInput | SearchCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Search update
   */
  export type SearchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Search
     */
    select?: SearchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Search
     */
    omit?: SearchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchInclude<ExtArgs> | null
    /**
     * The data needed to update a Search.
     */
    data: XOR<SearchUpdateInput, SearchUncheckedUpdateInput>
    /**
     * Choose, which Search to update.
     */
    where: SearchWhereUniqueInput
  }

  /**
   * Search updateMany
   */
  export type SearchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Searches.
     */
    data: XOR<SearchUpdateManyMutationInput, SearchUncheckedUpdateManyInput>
    /**
     * Filter which Searches to update
     */
    where?: SearchWhereInput
    /**
     * Limit how many Searches to update.
     */
    limit?: number
  }

  /**
   * Search updateManyAndReturn
   */
  export type SearchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Search
     */
    select?: SearchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Search
     */
    omit?: SearchOmit<ExtArgs> | null
    /**
     * The data used to update Searches.
     */
    data: XOR<SearchUpdateManyMutationInput, SearchUncheckedUpdateManyInput>
    /**
     * Filter which Searches to update
     */
    where?: SearchWhereInput
    /**
     * Limit how many Searches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Search upsert
   */
  export type SearchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Search
     */
    select?: SearchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Search
     */
    omit?: SearchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchInclude<ExtArgs> | null
    /**
     * The filter to search for the Search to update in case it exists.
     */
    where: SearchWhereUniqueInput
    /**
     * In case the Search found by the `where` argument doesn't exist, create a new Search with this data.
     */
    create: XOR<SearchCreateInput, SearchUncheckedCreateInput>
    /**
     * In case the Search was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SearchUpdateInput, SearchUncheckedUpdateInput>
  }

  /**
   * Search delete
   */
  export type SearchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Search
     */
    select?: SearchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Search
     */
    omit?: SearchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchInclude<ExtArgs> | null
    /**
     * Filter which Search to delete.
     */
    where: SearchWhereUniqueInput
  }

  /**
   * Search deleteMany
   */
  export type SearchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Searches to delete
     */
    where?: SearchWhereInput
    /**
     * Limit how many Searches to delete.
     */
    limit?: number
  }

  /**
   * Search.listings
   */
  export type Search$listingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    where?: ListingWhereInput
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    cursor?: ListingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * Search.notifications
   */
  export type Search$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Search without action
   */
  export type SearchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Search
     */
    select?: SearchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Search
     */
    omit?: SearchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchInclude<ExtArgs> | null
  }


  /**
   * Model Listing
   */

  export type AggregateListing = {
    _count: ListingCountAggregateOutputType | null
    _avg: ListingAvgAggregateOutputType | null
    _sum: ListingSumAggregateOutputType | null
    _min: ListingMinAggregateOutputType | null
    _max: ListingMaxAggregateOutputType | null
  }

  export type ListingAvgAggregateOutputType = {
    id: number | null
    searchId: number | null
  }

  export type ListingSumAggregateOutputType = {
    id: number | null
    searchId: number | null
  }

  export type ListingMinAggregateOutputType = {
    id: number | null
    searchId: number | null
    externalId: string | null
    title: string | null
    price: string | null
    location: string | null
    imageUrl: string | null
    url: string | null
    platform: $Enums.Platform | null
    publishedAt: Date | null
    foundAt: Date | null
    firstSeenAt: Date | null
    isBaseline: boolean | null
    notifiedAt: Date | null
  }

  export type ListingMaxAggregateOutputType = {
    id: number | null
    searchId: number | null
    externalId: string | null
    title: string | null
    price: string | null
    location: string | null
    imageUrl: string | null
    url: string | null
    platform: $Enums.Platform | null
    publishedAt: Date | null
    foundAt: Date | null
    firstSeenAt: Date | null
    isBaseline: boolean | null
    notifiedAt: Date | null
  }

  export type ListingCountAggregateOutputType = {
    id: number
    searchId: number
    externalId: number
    title: number
    price: number
    location: number
    imageUrl: number
    url: number
    platform: number
    publishedAt: number
    foundAt: number
    firstSeenAt: number
    isBaseline: number
    notifiedAt: number
    _all: number
  }


  export type ListingAvgAggregateInputType = {
    id?: true
    searchId?: true
  }

  export type ListingSumAggregateInputType = {
    id?: true
    searchId?: true
  }

  export type ListingMinAggregateInputType = {
    id?: true
    searchId?: true
    externalId?: true
    title?: true
    price?: true
    location?: true
    imageUrl?: true
    url?: true
    platform?: true
    publishedAt?: true
    foundAt?: true
    firstSeenAt?: true
    isBaseline?: true
    notifiedAt?: true
  }

  export type ListingMaxAggregateInputType = {
    id?: true
    searchId?: true
    externalId?: true
    title?: true
    price?: true
    location?: true
    imageUrl?: true
    url?: true
    platform?: true
    publishedAt?: true
    foundAt?: true
    firstSeenAt?: true
    isBaseline?: true
    notifiedAt?: true
  }

  export type ListingCountAggregateInputType = {
    id?: true
    searchId?: true
    externalId?: true
    title?: true
    price?: true
    location?: true
    imageUrl?: true
    url?: true
    platform?: true
    publishedAt?: true
    foundAt?: true
    firstSeenAt?: true
    isBaseline?: true
    notifiedAt?: true
    _all?: true
  }

  export type ListingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Listing to aggregate.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Listings
    **/
    _count?: true | ListingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ListingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ListingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ListingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ListingMaxAggregateInputType
  }

  export type GetListingAggregateType<T extends ListingAggregateArgs> = {
        [P in keyof T & keyof AggregateListing]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateListing[P]>
      : GetScalarType<T[P], AggregateListing[P]>
  }




  export type ListingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingWhereInput
    orderBy?: ListingOrderByWithAggregationInput | ListingOrderByWithAggregationInput[]
    by: ListingScalarFieldEnum[] | ListingScalarFieldEnum
    having?: ListingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ListingCountAggregateInputType | true
    _avg?: ListingAvgAggregateInputType
    _sum?: ListingSumAggregateInputType
    _min?: ListingMinAggregateInputType
    _max?: ListingMaxAggregateInputType
  }

  export type ListingGroupByOutputType = {
    id: number
    searchId: number
    externalId: string
    title: string
    price: string | null
    location: string | null
    imageUrl: string | null
    url: string
    platform: $Enums.Platform
    publishedAt: Date | null
    foundAt: Date
    firstSeenAt: Date
    isBaseline: boolean
    notifiedAt: Date | null
    _count: ListingCountAggregateOutputType | null
    _avg: ListingAvgAggregateOutputType | null
    _sum: ListingSumAggregateOutputType | null
    _min: ListingMinAggregateOutputType | null
    _max: ListingMaxAggregateOutputType | null
  }

  type GetListingGroupByPayload<T extends ListingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ListingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ListingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ListingGroupByOutputType[P]>
            : GetScalarType<T[P], ListingGroupByOutputType[P]>
        }
      >
    >


  export type ListingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    searchId?: boolean
    externalId?: boolean
    title?: boolean
    price?: boolean
    location?: boolean
    imageUrl?: boolean
    url?: boolean
    platform?: boolean
    publishedAt?: boolean
    foundAt?: boolean
    firstSeenAt?: boolean
    isBaseline?: boolean
    notifiedAt?: boolean
    search?: boolean | SearchDefaultArgs<ExtArgs>
    notifications?: boolean | Listing$notificationsArgs<ExtArgs>
    favorites?: boolean | Listing$favoritesArgs<ExtArgs>
    _count?: boolean | ListingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listing"]>

  export type ListingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    searchId?: boolean
    externalId?: boolean
    title?: boolean
    price?: boolean
    location?: boolean
    imageUrl?: boolean
    url?: boolean
    platform?: boolean
    publishedAt?: boolean
    foundAt?: boolean
    firstSeenAt?: boolean
    isBaseline?: boolean
    notifiedAt?: boolean
    search?: boolean | SearchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listing"]>

  export type ListingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    searchId?: boolean
    externalId?: boolean
    title?: boolean
    price?: boolean
    location?: boolean
    imageUrl?: boolean
    url?: boolean
    platform?: boolean
    publishedAt?: boolean
    foundAt?: boolean
    firstSeenAt?: boolean
    isBaseline?: boolean
    notifiedAt?: boolean
    search?: boolean | SearchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listing"]>

  export type ListingSelectScalar = {
    id?: boolean
    searchId?: boolean
    externalId?: boolean
    title?: boolean
    price?: boolean
    location?: boolean
    imageUrl?: boolean
    url?: boolean
    platform?: boolean
    publishedAt?: boolean
    foundAt?: boolean
    firstSeenAt?: boolean
    isBaseline?: boolean
    notifiedAt?: boolean
  }

  export type ListingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "searchId" | "externalId" | "title" | "price" | "location" | "imageUrl" | "url" | "platform" | "publishedAt" | "foundAt" | "firstSeenAt" | "isBaseline" | "notifiedAt", ExtArgs["result"]["listing"]>
  export type ListingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    search?: boolean | SearchDefaultArgs<ExtArgs>
    notifications?: boolean | Listing$notificationsArgs<ExtArgs>
    favorites?: boolean | Listing$favoritesArgs<ExtArgs>
    _count?: boolean | ListingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ListingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    search?: boolean | SearchDefaultArgs<ExtArgs>
  }
  export type ListingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    search?: boolean | SearchDefaultArgs<ExtArgs>
  }

  export type $ListingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Listing"
    objects: {
      search: Prisma.$SearchPayload<ExtArgs>
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      favorites: Prisma.$FavoritePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      searchId: number
      externalId: string
      title: string
      price: string | null
      location: string | null
      imageUrl: string | null
      url: string
      platform: $Enums.Platform
      publishedAt: Date | null
      foundAt: Date
      firstSeenAt: Date
      isBaseline: boolean
      notifiedAt: Date | null
    }, ExtArgs["result"]["listing"]>
    composites: {}
  }

  type ListingGetPayload<S extends boolean | null | undefined | ListingDefaultArgs> = $Result.GetResult<Prisma.$ListingPayload, S>

  type ListingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ListingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ListingCountAggregateInputType | true
    }

  export interface ListingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Listing'], meta: { name: 'Listing' } }
    /**
     * Find zero or one Listing that matches the filter.
     * @param {ListingFindUniqueArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ListingFindUniqueArgs>(args: SelectSubset<T, ListingFindUniqueArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Listing that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ListingFindUniqueOrThrowArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ListingFindUniqueOrThrowArgs>(args: SelectSubset<T, ListingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Listing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingFindFirstArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ListingFindFirstArgs>(args?: SelectSubset<T, ListingFindFirstArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Listing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingFindFirstOrThrowArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ListingFindFirstOrThrowArgs>(args?: SelectSubset<T, ListingFindFirstOrThrowArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Listings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Listings
     * const listings = await prisma.listing.findMany()
     * 
     * // Get first 10 Listings
     * const listings = await prisma.listing.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const listingWithIdOnly = await prisma.listing.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ListingFindManyArgs>(args?: SelectSubset<T, ListingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Listing.
     * @param {ListingCreateArgs} args - Arguments to create a Listing.
     * @example
     * // Create one Listing
     * const Listing = await prisma.listing.create({
     *   data: {
     *     // ... data to create a Listing
     *   }
     * })
     * 
     */
    create<T extends ListingCreateArgs>(args: SelectSubset<T, ListingCreateArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Listings.
     * @param {ListingCreateManyArgs} args - Arguments to create many Listings.
     * @example
     * // Create many Listings
     * const listing = await prisma.listing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ListingCreateManyArgs>(args?: SelectSubset<T, ListingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Listings and returns the data saved in the database.
     * @param {ListingCreateManyAndReturnArgs} args - Arguments to create many Listings.
     * @example
     * // Create many Listings
     * const listing = await prisma.listing.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Listings and only return the `id`
     * const listingWithIdOnly = await prisma.listing.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ListingCreateManyAndReturnArgs>(args?: SelectSubset<T, ListingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Listing.
     * @param {ListingDeleteArgs} args - Arguments to delete one Listing.
     * @example
     * // Delete one Listing
     * const Listing = await prisma.listing.delete({
     *   where: {
     *     // ... filter to delete one Listing
     *   }
     * })
     * 
     */
    delete<T extends ListingDeleteArgs>(args: SelectSubset<T, ListingDeleteArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Listing.
     * @param {ListingUpdateArgs} args - Arguments to update one Listing.
     * @example
     * // Update one Listing
     * const listing = await prisma.listing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ListingUpdateArgs>(args: SelectSubset<T, ListingUpdateArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Listings.
     * @param {ListingDeleteManyArgs} args - Arguments to filter Listings to delete.
     * @example
     * // Delete a few Listings
     * const { count } = await prisma.listing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ListingDeleteManyArgs>(args?: SelectSubset<T, ListingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Listings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Listings
     * const listing = await prisma.listing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ListingUpdateManyArgs>(args: SelectSubset<T, ListingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Listings and returns the data updated in the database.
     * @param {ListingUpdateManyAndReturnArgs} args - Arguments to update many Listings.
     * @example
     * // Update many Listings
     * const listing = await prisma.listing.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Listings and only return the `id`
     * const listingWithIdOnly = await prisma.listing.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ListingUpdateManyAndReturnArgs>(args: SelectSubset<T, ListingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Listing.
     * @param {ListingUpsertArgs} args - Arguments to update or create a Listing.
     * @example
     * // Update or create a Listing
     * const listing = await prisma.listing.upsert({
     *   create: {
     *     // ... data to create a Listing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Listing we want to update
     *   }
     * })
     */
    upsert<T extends ListingUpsertArgs>(args: SelectSubset<T, ListingUpsertArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Listings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingCountArgs} args - Arguments to filter Listings to count.
     * @example
     * // Count the number of Listings
     * const count = await prisma.listing.count({
     *   where: {
     *     // ... the filter for the Listings we want to count
     *   }
     * })
    **/
    count<T extends ListingCountArgs>(
      args?: Subset<T, ListingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ListingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Listing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ListingAggregateArgs>(args: Subset<T, ListingAggregateArgs>): Prisma.PrismaPromise<GetListingAggregateType<T>>

    /**
     * Group by Listing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ListingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ListingGroupByArgs['orderBy'] }
        : { orderBy?: ListingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ListingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetListingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Listing model
   */
  readonly fields: ListingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Listing.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ListingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    search<T extends SearchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SearchDefaultArgs<ExtArgs>>): Prisma__SearchClient<$Result.GetResult<Prisma.$SearchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    notifications<T extends Listing$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, Listing$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    favorites<T extends Listing$favoritesArgs<ExtArgs> = {}>(args?: Subset<T, Listing$favoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Listing model
   */
  interface ListingFieldRefs {
    readonly id: FieldRef<"Listing", 'Int'>
    readonly searchId: FieldRef<"Listing", 'Int'>
    readonly externalId: FieldRef<"Listing", 'String'>
    readonly title: FieldRef<"Listing", 'String'>
    readonly price: FieldRef<"Listing", 'String'>
    readonly location: FieldRef<"Listing", 'String'>
    readonly imageUrl: FieldRef<"Listing", 'String'>
    readonly url: FieldRef<"Listing", 'String'>
    readonly platform: FieldRef<"Listing", 'Platform'>
    readonly publishedAt: FieldRef<"Listing", 'DateTime'>
    readonly foundAt: FieldRef<"Listing", 'DateTime'>
    readonly firstSeenAt: FieldRef<"Listing", 'DateTime'>
    readonly isBaseline: FieldRef<"Listing", 'Boolean'>
    readonly notifiedAt: FieldRef<"Listing", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Listing findUnique
   */
  export type ListingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing findUniqueOrThrow
   */
  export type ListingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing findFirst
   */
  export type ListingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Listings.
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Listings.
     */
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * Listing findFirstOrThrow
   */
  export type ListingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Listings.
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Listings.
     */
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * Listing findMany
   */
  export type ListingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listings to fetch.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Listings.
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Listings.
     */
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * Listing create
   */
  export type ListingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * The data needed to create a Listing.
     */
    data: XOR<ListingCreateInput, ListingUncheckedCreateInput>
  }

  /**
   * Listing createMany
   */
  export type ListingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Listings.
     */
    data: ListingCreateManyInput | ListingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Listing createManyAndReturn
   */
  export type ListingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * The data used to create many Listings.
     */
    data: ListingCreateManyInput | ListingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Listing update
   */
  export type ListingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * The data needed to update a Listing.
     */
    data: XOR<ListingUpdateInput, ListingUncheckedUpdateInput>
    /**
     * Choose, which Listing to update.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing updateMany
   */
  export type ListingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Listings.
     */
    data: XOR<ListingUpdateManyMutationInput, ListingUncheckedUpdateManyInput>
    /**
     * Filter which Listings to update
     */
    where?: ListingWhereInput
    /**
     * Limit how many Listings to update.
     */
    limit?: number
  }

  /**
   * Listing updateManyAndReturn
   */
  export type ListingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * The data used to update Listings.
     */
    data: XOR<ListingUpdateManyMutationInput, ListingUncheckedUpdateManyInput>
    /**
     * Filter which Listings to update
     */
    where?: ListingWhereInput
    /**
     * Limit how many Listings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Listing upsert
   */
  export type ListingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * The filter to search for the Listing to update in case it exists.
     */
    where: ListingWhereUniqueInput
    /**
     * In case the Listing found by the `where` argument doesn't exist, create a new Listing with this data.
     */
    create: XOR<ListingCreateInput, ListingUncheckedCreateInput>
    /**
     * In case the Listing was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ListingUpdateInput, ListingUncheckedUpdateInput>
  }

  /**
   * Listing delete
   */
  export type ListingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter which Listing to delete.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing deleteMany
   */
  export type ListingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Listings to delete
     */
    where?: ListingWhereInput
    /**
     * Limit how many Listings to delete.
     */
    limit?: number
  }

  /**
   * Listing.notifications
   */
  export type Listing$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Listing.favorites
   */
  export type Listing$favoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    where?: FavoriteWhereInput
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    cursor?: FavoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Listing without action
   */
  export type ListingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    days: number | null
    stars: number | null
  }

  export type PaymentSumAggregateOutputType = {
    id: number | null
    userId: number | null
    days: number | null
    stars: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: number | null
    userId: number | null
    telegramPaymentChargeId: string | null
    plan: $Enums.Plan | null
    days: number | null
    stars: number | null
    status: $Enums.PaymentStatus | null
    createdAt: Date | null
    completedAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    telegramPaymentChargeId: string | null
    plan: $Enums.Plan | null
    days: number | null
    stars: number | null
    status: $Enums.PaymentStatus | null
    createdAt: Date | null
    completedAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    userId: number
    telegramPaymentChargeId: number
    plan: number
    days: number
    stars: number
    status: number
    createdAt: number
    completedAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    id?: true
    userId?: true
    days?: true
    stars?: true
  }

  export type PaymentSumAggregateInputType = {
    id?: true
    userId?: true
    days?: true
    stars?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    userId?: true
    telegramPaymentChargeId?: true
    plan?: true
    days?: true
    stars?: true
    status?: true
    createdAt?: true
    completedAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    userId?: true
    telegramPaymentChargeId?: true
    plan?: true
    days?: true
    stars?: true
    status?: true
    createdAt?: true
    completedAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    userId?: true
    telegramPaymentChargeId?: true
    plan?: true
    days?: true
    stars?: true
    status?: true
    createdAt?: true
    completedAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: number
    userId: number
    telegramPaymentChargeId: string | null
    plan: $Enums.Plan
    days: number
    stars: number
    status: $Enums.PaymentStatus
    createdAt: Date
    completedAt: Date | null
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    telegramPaymentChargeId?: boolean
    plan?: boolean
    days?: boolean
    stars?: boolean
    status?: boolean
    createdAt?: boolean
    completedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    telegramPaymentChargeId?: boolean
    plan?: boolean
    days?: boolean
    stars?: boolean
    status?: boolean
    createdAt?: boolean
    completedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    telegramPaymentChargeId?: boolean
    plan?: boolean
    days?: boolean
    stars?: boolean
    status?: boolean
    createdAt?: boolean
    completedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    userId?: boolean
    telegramPaymentChargeId?: boolean
    plan?: boolean
    days?: boolean
    stars?: boolean
    status?: boolean
    createdAt?: boolean
    completedAt?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "telegramPaymentChargeId" | "plan" | "days" | "stars" | "status" | "createdAt" | "completedAt", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      telegramPaymentChargeId: string | null
      plan: $Enums.Plan
      days: number
      stars: number
      status: $Enums.PaymentStatus
      createdAt: Date
      completedAt: Date | null
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'Int'>
    readonly userId: FieldRef<"Payment", 'Int'>
    readonly telegramPaymentChargeId: FieldRef<"Payment", 'String'>
    readonly plan: FieldRef<"Payment", 'Plan'>
    readonly days: FieldRef<"Payment", 'Int'>
    readonly stars: FieldRef<"Payment", 'Int'>
    readonly status: FieldRef<"Payment", 'PaymentStatus'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly completedAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model Favorite
   */

  export type AggregateFavorite = {
    _count: FavoriteCountAggregateOutputType | null
    _avg: FavoriteAvgAggregateOutputType | null
    _sum: FavoriteSumAggregateOutputType | null
    _min: FavoriteMinAggregateOutputType | null
    _max: FavoriteMaxAggregateOutputType | null
  }

  export type FavoriteAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    listingId: number | null
  }

  export type FavoriteSumAggregateOutputType = {
    id: number | null
    userId: number | null
    listingId: number | null
  }

  export type FavoriteMinAggregateOutputType = {
    id: number | null
    userId: number | null
    listingId: number | null
    createdAt: Date | null
  }

  export type FavoriteMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    listingId: number | null
    createdAt: Date | null
  }

  export type FavoriteCountAggregateOutputType = {
    id: number
    userId: number
    listingId: number
    createdAt: number
    _all: number
  }


  export type FavoriteAvgAggregateInputType = {
    id?: true
    userId?: true
    listingId?: true
  }

  export type FavoriteSumAggregateInputType = {
    id?: true
    userId?: true
    listingId?: true
  }

  export type FavoriteMinAggregateInputType = {
    id?: true
    userId?: true
    listingId?: true
    createdAt?: true
  }

  export type FavoriteMaxAggregateInputType = {
    id?: true
    userId?: true
    listingId?: true
    createdAt?: true
  }

  export type FavoriteCountAggregateInputType = {
    id?: true
    userId?: true
    listingId?: true
    createdAt?: true
    _all?: true
  }

  export type FavoriteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Favorite to aggregate.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Favorites
    **/
    _count?: true | FavoriteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FavoriteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FavoriteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FavoriteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FavoriteMaxAggregateInputType
  }

  export type GetFavoriteAggregateType<T extends FavoriteAggregateArgs> = {
        [P in keyof T & keyof AggregateFavorite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFavorite[P]>
      : GetScalarType<T[P], AggregateFavorite[P]>
  }




  export type FavoriteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteWhereInput
    orderBy?: FavoriteOrderByWithAggregationInput | FavoriteOrderByWithAggregationInput[]
    by: FavoriteScalarFieldEnum[] | FavoriteScalarFieldEnum
    having?: FavoriteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FavoriteCountAggregateInputType | true
    _avg?: FavoriteAvgAggregateInputType
    _sum?: FavoriteSumAggregateInputType
    _min?: FavoriteMinAggregateInputType
    _max?: FavoriteMaxAggregateInputType
  }

  export type FavoriteGroupByOutputType = {
    id: number
    userId: number
    listingId: number
    createdAt: Date
    _count: FavoriteCountAggregateOutputType | null
    _avg: FavoriteAvgAggregateOutputType | null
    _sum: FavoriteSumAggregateOutputType | null
    _min: FavoriteMinAggregateOutputType | null
    _max: FavoriteMaxAggregateOutputType | null
  }

  type GetFavoriteGroupByPayload<T extends FavoriteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FavoriteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FavoriteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FavoriteGroupByOutputType[P]>
            : GetScalarType<T[P], FavoriteGroupByOutputType[P]>
        }
      >
    >


  export type FavoriteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    listingId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favorite"]>

  export type FavoriteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    listingId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favorite"]>

  export type FavoriteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    listingId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favorite"]>

  export type FavoriteSelectScalar = {
    id?: boolean
    userId?: boolean
    listingId?: boolean
    createdAt?: boolean
  }

  export type FavoriteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "listingId" | "createdAt", ExtArgs["result"]["favorite"]>
  export type FavoriteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }
  export type FavoriteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }
  export type FavoriteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }

  export type $FavoritePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Favorite"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      listing: Prisma.$ListingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      listingId: number
      createdAt: Date
    }, ExtArgs["result"]["favorite"]>
    composites: {}
  }

  type FavoriteGetPayload<S extends boolean | null | undefined | FavoriteDefaultArgs> = $Result.GetResult<Prisma.$FavoritePayload, S>

  type FavoriteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FavoriteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FavoriteCountAggregateInputType | true
    }

  export interface FavoriteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Favorite'], meta: { name: 'Favorite' } }
    /**
     * Find zero or one Favorite that matches the filter.
     * @param {FavoriteFindUniqueArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FavoriteFindUniqueArgs>(args: SelectSubset<T, FavoriteFindUniqueArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Favorite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FavoriteFindUniqueOrThrowArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FavoriteFindUniqueOrThrowArgs>(args: SelectSubset<T, FavoriteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Favorite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFindFirstArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FavoriteFindFirstArgs>(args?: SelectSubset<T, FavoriteFindFirstArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Favorite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFindFirstOrThrowArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FavoriteFindFirstOrThrowArgs>(args?: SelectSubset<T, FavoriteFindFirstOrThrowArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Favorites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Favorites
     * const favorites = await prisma.favorite.findMany()
     * 
     * // Get first 10 Favorites
     * const favorites = await prisma.favorite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const favoriteWithIdOnly = await prisma.favorite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FavoriteFindManyArgs>(args?: SelectSubset<T, FavoriteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Favorite.
     * @param {FavoriteCreateArgs} args - Arguments to create a Favorite.
     * @example
     * // Create one Favorite
     * const Favorite = await prisma.favorite.create({
     *   data: {
     *     // ... data to create a Favorite
     *   }
     * })
     * 
     */
    create<T extends FavoriteCreateArgs>(args: SelectSubset<T, FavoriteCreateArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Favorites.
     * @param {FavoriteCreateManyArgs} args - Arguments to create many Favorites.
     * @example
     * // Create many Favorites
     * const favorite = await prisma.favorite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FavoriteCreateManyArgs>(args?: SelectSubset<T, FavoriteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Favorites and returns the data saved in the database.
     * @param {FavoriteCreateManyAndReturnArgs} args - Arguments to create many Favorites.
     * @example
     * // Create many Favorites
     * const favorite = await prisma.favorite.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Favorites and only return the `id`
     * const favoriteWithIdOnly = await prisma.favorite.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FavoriteCreateManyAndReturnArgs>(args?: SelectSubset<T, FavoriteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Favorite.
     * @param {FavoriteDeleteArgs} args - Arguments to delete one Favorite.
     * @example
     * // Delete one Favorite
     * const Favorite = await prisma.favorite.delete({
     *   where: {
     *     // ... filter to delete one Favorite
     *   }
     * })
     * 
     */
    delete<T extends FavoriteDeleteArgs>(args: SelectSubset<T, FavoriteDeleteArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Favorite.
     * @param {FavoriteUpdateArgs} args - Arguments to update one Favorite.
     * @example
     * // Update one Favorite
     * const favorite = await prisma.favorite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FavoriteUpdateArgs>(args: SelectSubset<T, FavoriteUpdateArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Favorites.
     * @param {FavoriteDeleteManyArgs} args - Arguments to filter Favorites to delete.
     * @example
     * // Delete a few Favorites
     * const { count } = await prisma.favorite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FavoriteDeleteManyArgs>(args?: SelectSubset<T, FavoriteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Favorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Favorites
     * const favorite = await prisma.favorite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FavoriteUpdateManyArgs>(args: SelectSubset<T, FavoriteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Favorites and returns the data updated in the database.
     * @param {FavoriteUpdateManyAndReturnArgs} args - Arguments to update many Favorites.
     * @example
     * // Update many Favorites
     * const favorite = await prisma.favorite.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Favorites and only return the `id`
     * const favoriteWithIdOnly = await prisma.favorite.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FavoriteUpdateManyAndReturnArgs>(args: SelectSubset<T, FavoriteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Favorite.
     * @param {FavoriteUpsertArgs} args - Arguments to update or create a Favorite.
     * @example
     * // Update or create a Favorite
     * const favorite = await prisma.favorite.upsert({
     *   create: {
     *     // ... data to create a Favorite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Favorite we want to update
     *   }
     * })
     */
    upsert<T extends FavoriteUpsertArgs>(args: SelectSubset<T, FavoriteUpsertArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Favorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteCountArgs} args - Arguments to filter Favorites to count.
     * @example
     * // Count the number of Favorites
     * const count = await prisma.favorite.count({
     *   where: {
     *     // ... the filter for the Favorites we want to count
     *   }
     * })
    **/
    count<T extends FavoriteCountArgs>(
      args?: Subset<T, FavoriteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FavoriteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Favorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FavoriteAggregateArgs>(args: Subset<T, FavoriteAggregateArgs>): Prisma.PrismaPromise<GetFavoriteAggregateType<T>>

    /**
     * Group by Favorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FavoriteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FavoriteGroupByArgs['orderBy'] }
        : { orderBy?: FavoriteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FavoriteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFavoriteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Favorite model
   */
  readonly fields: FavoriteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Favorite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FavoriteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    listing<T extends ListingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ListingDefaultArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Favorite model
   */
  interface FavoriteFieldRefs {
    readonly id: FieldRef<"Favorite", 'Int'>
    readonly userId: FieldRef<"Favorite", 'Int'>
    readonly listingId: FieldRef<"Favorite", 'Int'>
    readonly createdAt: FieldRef<"Favorite", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Favorite findUnique
   */
  export type FavoriteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite findUniqueOrThrow
   */
  export type FavoriteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite findFirst
   */
  export type FavoriteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Favorites.
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favorites.
     */
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Favorite findFirstOrThrow
   */
  export type FavoriteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Favorites.
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favorites.
     */
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Favorite findMany
   */
  export type FavoriteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorites to fetch.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Favorites.
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favorites.
     */
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Favorite create
   */
  export type FavoriteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * The data needed to create a Favorite.
     */
    data: XOR<FavoriteCreateInput, FavoriteUncheckedCreateInput>
  }

  /**
   * Favorite createMany
   */
  export type FavoriteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Favorites.
     */
    data: FavoriteCreateManyInput | FavoriteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Favorite createManyAndReturn
   */
  export type FavoriteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * The data used to create many Favorites.
     */
    data: FavoriteCreateManyInput | FavoriteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Favorite update
   */
  export type FavoriteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * The data needed to update a Favorite.
     */
    data: XOR<FavoriteUpdateInput, FavoriteUncheckedUpdateInput>
    /**
     * Choose, which Favorite to update.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite updateMany
   */
  export type FavoriteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Favorites.
     */
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyInput>
    /**
     * Filter which Favorites to update
     */
    where?: FavoriteWhereInput
    /**
     * Limit how many Favorites to update.
     */
    limit?: number
  }

  /**
   * Favorite updateManyAndReturn
   */
  export type FavoriteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * The data used to update Favorites.
     */
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyInput>
    /**
     * Filter which Favorites to update
     */
    where?: FavoriteWhereInput
    /**
     * Limit how many Favorites to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Favorite upsert
   */
  export type FavoriteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * The filter to search for the Favorite to update in case it exists.
     */
    where: FavoriteWhereUniqueInput
    /**
     * In case the Favorite found by the `where` argument doesn't exist, create a new Favorite with this data.
     */
    create: XOR<FavoriteCreateInput, FavoriteUncheckedCreateInput>
    /**
     * In case the Favorite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FavoriteUpdateInput, FavoriteUncheckedUpdateInput>
  }

  /**
   * Favorite delete
   */
  export type FavoriteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter which Favorite to delete.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite deleteMany
   */
  export type FavoriteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Favorites to delete
     */
    where?: FavoriteWhereInput
    /**
     * Limit how many Favorites to delete.
     */
    limit?: number
  }

  /**
   * Favorite without action
   */
  export type FavoriteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    searchId: number | null
    listingId: number | null
  }

  export type NotificationSumAggregateOutputType = {
    id: number | null
    userId: number | null
    searchId: number | null
    listingId: number | null
  }

  export type NotificationMinAggregateOutputType = {
    id: number | null
    userId: number | null
    searchId: number | null
    listingId: number | null
    status: $Enums.NotificationStatus | null
    sentAt: Date | null
    failReason: string | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    searchId: number | null
    listingId: number | null
    status: $Enums.NotificationStatus | null
    sentAt: Date | null
    failReason: string | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    searchId: number
    listingId: number
    status: number
    sentAt: number
    failReason: number
    createdAt: number
    _all: number
  }


  export type NotificationAvgAggregateInputType = {
    id?: true
    userId?: true
    searchId?: true
    listingId?: true
  }

  export type NotificationSumAggregateInputType = {
    id?: true
    userId?: true
    searchId?: true
    listingId?: true
  }

  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    searchId?: true
    listingId?: true
    status?: true
    sentAt?: true
    failReason?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    searchId?: true
    listingId?: true
    status?: true
    sentAt?: true
    failReason?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    searchId?: true
    listingId?: true
    status?: true
    sentAt?: true
    failReason?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _avg?: NotificationAvgAggregateInputType
    _sum?: NotificationSumAggregateInputType
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: number
    userId: number
    searchId: number
    listingId: number
    status: $Enums.NotificationStatus
    sentAt: Date | null
    failReason: string | null
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    searchId?: boolean
    listingId?: boolean
    status?: boolean
    sentAt?: boolean
    failReason?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    search?: boolean | SearchDefaultArgs<ExtArgs>
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    searchId?: boolean
    listingId?: boolean
    status?: boolean
    sentAt?: boolean
    failReason?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    search?: boolean | SearchDefaultArgs<ExtArgs>
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    searchId?: boolean
    listingId?: boolean
    status?: boolean
    sentAt?: boolean
    failReason?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    search?: boolean | SearchDefaultArgs<ExtArgs>
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    searchId?: boolean
    listingId?: boolean
    status?: boolean
    sentAt?: boolean
    failReason?: boolean
    createdAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "searchId" | "listingId" | "status" | "sentAt" | "failReason" | "createdAt", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    search?: boolean | SearchDefaultArgs<ExtArgs>
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    search?: boolean | SearchDefaultArgs<ExtArgs>
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    search?: boolean | SearchDefaultArgs<ExtArgs>
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      search: Prisma.$SearchPayload<ExtArgs>
      listing: Prisma.$ListingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      searchId: number
      listingId: number
      status: $Enums.NotificationStatus
      sentAt: Date | null
      failReason: string | null
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    search<T extends SearchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SearchDefaultArgs<ExtArgs>>): Prisma__SearchClient<$Result.GetResult<Prisma.$SearchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    listing<T extends ListingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ListingDefaultArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'Int'>
    readonly userId: FieldRef<"Notification", 'Int'>
    readonly searchId: FieldRef<"Notification", 'Int'>
    readonly listingId: FieldRef<"Notification", 'Int'>
    readonly status: FieldRef<"Notification", 'NotificationStatus'>
    readonly sentAt: FieldRef<"Notification", 'DateTime'>
    readonly failReason: FieldRef<"Notification", 'String'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Model UserSettings
   */

  export type AggregateUserSettings = {
    _count: UserSettingsCountAggregateOutputType | null
    _avg: UserSettingsAvgAggregateOutputType | null
    _sum: UserSettingsSumAggregateOutputType | null
    _min: UserSettingsMinAggregateOutputType | null
    _max: UserSettingsMaxAggregateOutputType | null
  }

  export type UserSettingsAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    workingHoursFrom: number | null
    workingHoursTo: number | null
  }

  export type UserSettingsSumAggregateOutputType = {
    id: number | null
    userId: number | null
    workingHoursFrom: number | null
    workingHoursTo: number | null
  }

  export type UserSettingsMinAggregateOutputType = {
    id: number | null
    userId: number | null
    silentMode: boolean | null
    photoMode: boolean | null
    digestMode: boolean | null
    workingHoursEnabled: boolean | null
    workingHoursFrom: number | null
    workingHoursTo: number | null
    timezone: string | null
    language: string | null
    updatedAt: Date | null
  }

  export type UserSettingsMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    silentMode: boolean | null
    photoMode: boolean | null
    digestMode: boolean | null
    workingHoursEnabled: boolean | null
    workingHoursFrom: number | null
    workingHoursTo: number | null
    timezone: string | null
    language: string | null
    updatedAt: Date | null
  }

  export type UserSettingsCountAggregateOutputType = {
    id: number
    userId: number
    silentMode: number
    photoMode: number
    digestMode: number
    workingHoursEnabled: number
    workingHoursFrom: number
    workingHoursTo: number
    timezone: number
    language: number
    updatedAt: number
    _all: number
  }


  export type UserSettingsAvgAggregateInputType = {
    id?: true
    userId?: true
    workingHoursFrom?: true
    workingHoursTo?: true
  }

  export type UserSettingsSumAggregateInputType = {
    id?: true
    userId?: true
    workingHoursFrom?: true
    workingHoursTo?: true
  }

  export type UserSettingsMinAggregateInputType = {
    id?: true
    userId?: true
    silentMode?: true
    photoMode?: true
    digestMode?: true
    workingHoursEnabled?: true
    workingHoursFrom?: true
    workingHoursTo?: true
    timezone?: true
    language?: true
    updatedAt?: true
  }

  export type UserSettingsMaxAggregateInputType = {
    id?: true
    userId?: true
    silentMode?: true
    photoMode?: true
    digestMode?: true
    workingHoursEnabled?: true
    workingHoursFrom?: true
    workingHoursTo?: true
    timezone?: true
    language?: true
    updatedAt?: true
  }

  export type UserSettingsCountAggregateInputType = {
    id?: true
    userId?: true
    silentMode?: true
    photoMode?: true
    digestMode?: true
    workingHoursEnabled?: true
    workingHoursFrom?: true
    workingHoursTo?: true
    timezone?: true
    language?: true
    updatedAt?: true
    _all?: true
  }

  export type UserSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSettings to aggregate.
     */
    where?: UserSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSettings to fetch.
     */
    orderBy?: UserSettingsOrderByWithRelationInput | UserSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserSettings
    **/
    _count?: true | UserSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserSettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserSettingsMaxAggregateInputType
  }

  export type GetUserSettingsAggregateType<T extends UserSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateUserSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserSettings[P]>
      : GetScalarType<T[P], AggregateUserSettings[P]>
  }




  export type UserSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSettingsWhereInput
    orderBy?: UserSettingsOrderByWithAggregationInput | UserSettingsOrderByWithAggregationInput[]
    by: UserSettingsScalarFieldEnum[] | UserSettingsScalarFieldEnum
    having?: UserSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserSettingsCountAggregateInputType | true
    _avg?: UserSettingsAvgAggregateInputType
    _sum?: UserSettingsSumAggregateInputType
    _min?: UserSettingsMinAggregateInputType
    _max?: UserSettingsMaxAggregateInputType
  }

  export type UserSettingsGroupByOutputType = {
    id: number
    userId: number
    silentMode: boolean
    photoMode: boolean
    digestMode: boolean
    workingHoursEnabled: boolean
    workingHoursFrom: number
    workingHoursTo: number
    timezone: string
    language: string
    updatedAt: Date
    _count: UserSettingsCountAggregateOutputType | null
    _avg: UserSettingsAvgAggregateOutputType | null
    _sum: UserSettingsSumAggregateOutputType | null
    _min: UserSettingsMinAggregateOutputType | null
    _max: UserSettingsMaxAggregateOutputType | null
  }

  type GetUserSettingsGroupByPayload<T extends UserSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], UserSettingsGroupByOutputType[P]>
        }
      >
    >


  export type UserSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    silentMode?: boolean
    photoMode?: boolean
    digestMode?: boolean
    workingHoursEnabled?: boolean
    workingHoursFrom?: boolean
    workingHoursTo?: boolean
    timezone?: boolean
    language?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSettings"]>

  export type UserSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    silentMode?: boolean
    photoMode?: boolean
    digestMode?: boolean
    workingHoursEnabled?: boolean
    workingHoursFrom?: boolean
    workingHoursTo?: boolean
    timezone?: boolean
    language?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSettings"]>

  export type UserSettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    silentMode?: boolean
    photoMode?: boolean
    digestMode?: boolean
    workingHoursEnabled?: boolean
    workingHoursFrom?: boolean
    workingHoursTo?: boolean
    timezone?: boolean
    language?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSettings"]>

  export type UserSettingsSelectScalar = {
    id?: boolean
    userId?: boolean
    silentMode?: boolean
    photoMode?: boolean
    digestMode?: boolean
    workingHoursEnabled?: boolean
    workingHoursFrom?: boolean
    workingHoursTo?: boolean
    timezone?: boolean
    language?: boolean
    updatedAt?: boolean
  }

  export type UserSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "silentMode" | "photoMode" | "digestMode" | "workingHoursEnabled" | "workingHoursFrom" | "workingHoursTo" | "timezone" | "language" | "updatedAt", ExtArgs["result"]["userSettings"]>
  export type UserSettingsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserSettingsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserSettingsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserSettings"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      silentMode: boolean
      photoMode: boolean
      digestMode: boolean
      workingHoursEnabled: boolean
      workingHoursFrom: number
      workingHoursTo: number
      timezone: string
      language: string
      updatedAt: Date
    }, ExtArgs["result"]["userSettings"]>
    composites: {}
  }

  type UserSettingsGetPayload<S extends boolean | null | undefined | UserSettingsDefaultArgs> = $Result.GetResult<Prisma.$UserSettingsPayload, S>

  type UserSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserSettingsCountAggregateInputType | true
    }

  export interface UserSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserSettings'], meta: { name: 'UserSettings' } }
    /**
     * Find zero or one UserSettings that matches the filter.
     * @param {UserSettingsFindUniqueArgs} args - Arguments to find a UserSettings
     * @example
     * // Get one UserSettings
     * const userSettings = await prisma.userSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserSettingsFindUniqueArgs>(args: SelectSubset<T, UserSettingsFindUniqueArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserSettingsFindUniqueOrThrowArgs} args - Arguments to find a UserSettings
     * @example
     * // Get one UserSettings
     * const userSettings = await prisma.userSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, UserSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSettingsFindFirstArgs} args - Arguments to find a UserSettings
     * @example
     * // Get one UserSettings
     * const userSettings = await prisma.userSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserSettingsFindFirstArgs>(args?: SelectSubset<T, UserSettingsFindFirstArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSettingsFindFirstOrThrowArgs} args - Arguments to find a UserSettings
     * @example
     * // Get one UserSettings
     * const userSettings = await prisma.userSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, UserSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserSettings
     * const userSettings = await prisma.userSettings.findMany()
     * 
     * // Get first 10 UserSettings
     * const userSettings = await prisma.userSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userSettingsWithIdOnly = await prisma.userSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserSettingsFindManyArgs>(args?: SelectSubset<T, UserSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserSettings.
     * @param {UserSettingsCreateArgs} args - Arguments to create a UserSettings.
     * @example
     * // Create one UserSettings
     * const UserSettings = await prisma.userSettings.create({
     *   data: {
     *     // ... data to create a UserSettings
     *   }
     * })
     * 
     */
    create<T extends UserSettingsCreateArgs>(args: SelectSubset<T, UserSettingsCreateArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserSettings.
     * @param {UserSettingsCreateManyArgs} args - Arguments to create many UserSettings.
     * @example
     * // Create many UserSettings
     * const userSettings = await prisma.userSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserSettingsCreateManyArgs>(args?: SelectSubset<T, UserSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserSettings and returns the data saved in the database.
     * @param {UserSettingsCreateManyAndReturnArgs} args - Arguments to create many UserSettings.
     * @example
     * // Create many UserSettings
     * const userSettings = await prisma.userSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserSettings and only return the `id`
     * const userSettingsWithIdOnly = await prisma.userSettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, UserSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserSettings.
     * @param {UserSettingsDeleteArgs} args - Arguments to delete one UserSettings.
     * @example
     * // Delete one UserSettings
     * const UserSettings = await prisma.userSettings.delete({
     *   where: {
     *     // ... filter to delete one UserSettings
     *   }
     * })
     * 
     */
    delete<T extends UserSettingsDeleteArgs>(args: SelectSubset<T, UserSettingsDeleteArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserSettings.
     * @param {UserSettingsUpdateArgs} args - Arguments to update one UserSettings.
     * @example
     * // Update one UserSettings
     * const userSettings = await prisma.userSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserSettingsUpdateArgs>(args: SelectSubset<T, UserSettingsUpdateArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserSettings.
     * @param {UserSettingsDeleteManyArgs} args - Arguments to filter UserSettings to delete.
     * @example
     * // Delete a few UserSettings
     * const { count } = await prisma.userSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserSettingsDeleteManyArgs>(args?: SelectSubset<T, UserSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserSettings
     * const userSettings = await prisma.userSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserSettingsUpdateManyArgs>(args: SelectSubset<T, UserSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSettings and returns the data updated in the database.
     * @param {UserSettingsUpdateManyAndReturnArgs} args - Arguments to update many UserSettings.
     * @example
     * // Update many UserSettings
     * const userSettings = await prisma.userSettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserSettings and only return the `id`
     * const userSettingsWithIdOnly = await prisma.userSettings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserSettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, UserSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserSettings.
     * @param {UserSettingsUpsertArgs} args - Arguments to update or create a UserSettings.
     * @example
     * // Update or create a UserSettings
     * const userSettings = await prisma.userSettings.upsert({
     *   create: {
     *     // ... data to create a UserSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserSettings we want to update
     *   }
     * })
     */
    upsert<T extends UserSettingsUpsertArgs>(args: SelectSubset<T, UserSettingsUpsertArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSettingsCountArgs} args - Arguments to filter UserSettings to count.
     * @example
     * // Count the number of UserSettings
     * const count = await prisma.userSettings.count({
     *   where: {
     *     // ... the filter for the UserSettings we want to count
     *   }
     * })
    **/
    count<T extends UserSettingsCountArgs>(
      args?: Subset<T, UserSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserSettingsAggregateArgs>(args: Subset<T, UserSettingsAggregateArgs>): Prisma.PrismaPromise<GetUserSettingsAggregateType<T>>

    /**
     * Group by UserSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserSettingsGroupByArgs['orderBy'] }
        : { orderBy?: UserSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserSettings model
   */
  readonly fields: UserSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserSettings model
   */
  interface UserSettingsFieldRefs {
    readonly id: FieldRef<"UserSettings", 'Int'>
    readonly userId: FieldRef<"UserSettings", 'Int'>
    readonly silentMode: FieldRef<"UserSettings", 'Boolean'>
    readonly photoMode: FieldRef<"UserSettings", 'Boolean'>
    readonly digestMode: FieldRef<"UserSettings", 'Boolean'>
    readonly workingHoursEnabled: FieldRef<"UserSettings", 'Boolean'>
    readonly workingHoursFrom: FieldRef<"UserSettings", 'Int'>
    readonly workingHoursTo: FieldRef<"UserSettings", 'Int'>
    readonly timezone: FieldRef<"UserSettings", 'String'>
    readonly language: FieldRef<"UserSettings", 'String'>
    readonly updatedAt: FieldRef<"UserSettings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserSettings findUnique
   */
  export type UserSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * Filter, which UserSettings to fetch.
     */
    where: UserSettingsWhereUniqueInput
  }

  /**
   * UserSettings findUniqueOrThrow
   */
  export type UserSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * Filter, which UserSettings to fetch.
     */
    where: UserSettingsWhereUniqueInput
  }

  /**
   * UserSettings findFirst
   */
  export type UserSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * Filter, which UserSettings to fetch.
     */
    where?: UserSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSettings to fetch.
     */
    orderBy?: UserSettingsOrderByWithRelationInput | UserSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSettings.
     */
    cursor?: UserSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSettings.
     */
    distinct?: UserSettingsScalarFieldEnum | UserSettingsScalarFieldEnum[]
  }

  /**
   * UserSettings findFirstOrThrow
   */
  export type UserSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * Filter, which UserSettings to fetch.
     */
    where?: UserSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSettings to fetch.
     */
    orderBy?: UserSettingsOrderByWithRelationInput | UserSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSettings.
     */
    cursor?: UserSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSettings.
     */
    distinct?: UserSettingsScalarFieldEnum | UserSettingsScalarFieldEnum[]
  }

  /**
   * UserSettings findMany
   */
  export type UserSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * Filter, which UserSettings to fetch.
     */
    where?: UserSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSettings to fetch.
     */
    orderBy?: UserSettingsOrderByWithRelationInput | UserSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserSettings.
     */
    cursor?: UserSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSettings.
     */
    distinct?: UserSettingsScalarFieldEnum | UserSettingsScalarFieldEnum[]
  }

  /**
   * UserSettings create
   */
  export type UserSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * The data needed to create a UserSettings.
     */
    data: XOR<UserSettingsCreateInput, UserSettingsUncheckedCreateInput>
  }

  /**
   * UserSettings createMany
   */
  export type UserSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserSettings.
     */
    data: UserSettingsCreateManyInput | UserSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserSettings createManyAndReturn
   */
  export type UserSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * The data used to create many UserSettings.
     */
    data: UserSettingsCreateManyInput | UserSettingsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSettings update
   */
  export type UserSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * The data needed to update a UserSettings.
     */
    data: XOR<UserSettingsUpdateInput, UserSettingsUncheckedUpdateInput>
    /**
     * Choose, which UserSettings to update.
     */
    where: UserSettingsWhereUniqueInput
  }

  /**
   * UserSettings updateMany
   */
  export type UserSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserSettings.
     */
    data: XOR<UserSettingsUpdateManyMutationInput, UserSettingsUncheckedUpdateManyInput>
    /**
     * Filter which UserSettings to update
     */
    where?: UserSettingsWhereInput
    /**
     * Limit how many UserSettings to update.
     */
    limit?: number
  }

  /**
   * UserSettings updateManyAndReturn
   */
  export type UserSettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * The data used to update UserSettings.
     */
    data: XOR<UserSettingsUpdateManyMutationInput, UserSettingsUncheckedUpdateManyInput>
    /**
     * Filter which UserSettings to update
     */
    where?: UserSettingsWhereInput
    /**
     * Limit how many UserSettings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSettings upsert
   */
  export type UserSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * The filter to search for the UserSettings to update in case it exists.
     */
    where: UserSettingsWhereUniqueInput
    /**
     * In case the UserSettings found by the `where` argument doesn't exist, create a new UserSettings with this data.
     */
    create: XOR<UserSettingsCreateInput, UserSettingsUncheckedCreateInput>
    /**
     * In case the UserSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserSettingsUpdateInput, UserSettingsUncheckedUpdateInput>
  }

  /**
   * UserSettings delete
   */
  export type UserSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * Filter which UserSettings to delete.
     */
    where: UserSettingsWhereUniqueInput
  }

  /**
   * UserSettings deleteMany
   */
  export type UserSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSettings to delete
     */
    where?: UserSettingsWhereInput
    /**
     * Limit how many UserSettings to delete.
     */
    limit?: number
  }

  /**
   * UserSettings without action
   */
  export type UserSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
  }


  /**
   * Model PromoCode
   */

  export type AggregatePromoCode = {
    _count: PromoCodeCountAggregateOutputType | null
    _avg: PromoCodeAvgAggregateOutputType | null
    _sum: PromoCodeSumAggregateOutputType | null
    _min: PromoCodeMinAggregateOutputType | null
    _max: PromoCodeMaxAggregateOutputType | null
  }

  export type PromoCodeAvgAggregateOutputType = {
    id: number | null
    days: number | null
    maxUses: number | null
    usedCount: number | null
  }

  export type PromoCodeSumAggregateOutputType = {
    id: number | null
    days: number | null
    maxUses: number | null
    usedCount: number | null
  }

  export type PromoCodeMinAggregateOutputType = {
    id: number | null
    code: string | null
    plan: $Enums.Plan | null
    days: number | null
    maxUses: number | null
    usedCount: number | null
    expiresAt: Date | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type PromoCodeMaxAggregateOutputType = {
    id: number | null
    code: string | null
    plan: $Enums.Plan | null
    days: number | null
    maxUses: number | null
    usedCount: number | null
    expiresAt: Date | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type PromoCodeCountAggregateOutputType = {
    id: number
    code: number
    plan: number
    days: number
    maxUses: number
    usedCount: number
    expiresAt: number
    isActive: number
    createdAt: number
    _all: number
  }


  export type PromoCodeAvgAggregateInputType = {
    id?: true
    days?: true
    maxUses?: true
    usedCount?: true
  }

  export type PromoCodeSumAggregateInputType = {
    id?: true
    days?: true
    maxUses?: true
    usedCount?: true
  }

  export type PromoCodeMinAggregateInputType = {
    id?: true
    code?: true
    plan?: true
    days?: true
    maxUses?: true
    usedCount?: true
    expiresAt?: true
    isActive?: true
    createdAt?: true
  }

  export type PromoCodeMaxAggregateInputType = {
    id?: true
    code?: true
    plan?: true
    days?: true
    maxUses?: true
    usedCount?: true
    expiresAt?: true
    isActive?: true
    createdAt?: true
  }

  export type PromoCodeCountAggregateInputType = {
    id?: true
    code?: true
    plan?: true
    days?: true
    maxUses?: true
    usedCount?: true
    expiresAt?: true
    isActive?: true
    createdAt?: true
    _all?: true
  }

  export type PromoCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PromoCode to aggregate.
     */
    where?: PromoCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PromoCodes to fetch.
     */
    orderBy?: PromoCodeOrderByWithRelationInput | PromoCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PromoCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PromoCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PromoCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PromoCodes
    **/
    _count?: true | PromoCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PromoCodeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PromoCodeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PromoCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PromoCodeMaxAggregateInputType
  }

  export type GetPromoCodeAggregateType<T extends PromoCodeAggregateArgs> = {
        [P in keyof T & keyof AggregatePromoCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePromoCode[P]>
      : GetScalarType<T[P], AggregatePromoCode[P]>
  }




  export type PromoCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PromoCodeWhereInput
    orderBy?: PromoCodeOrderByWithAggregationInput | PromoCodeOrderByWithAggregationInput[]
    by: PromoCodeScalarFieldEnum[] | PromoCodeScalarFieldEnum
    having?: PromoCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PromoCodeCountAggregateInputType | true
    _avg?: PromoCodeAvgAggregateInputType
    _sum?: PromoCodeSumAggregateInputType
    _min?: PromoCodeMinAggregateInputType
    _max?: PromoCodeMaxAggregateInputType
  }

  export type PromoCodeGroupByOutputType = {
    id: number
    code: string
    plan: $Enums.Plan
    days: number
    maxUses: number
    usedCount: number
    expiresAt: Date | null
    isActive: boolean
    createdAt: Date
    _count: PromoCodeCountAggregateOutputType | null
    _avg: PromoCodeAvgAggregateOutputType | null
    _sum: PromoCodeSumAggregateOutputType | null
    _min: PromoCodeMinAggregateOutputType | null
    _max: PromoCodeMaxAggregateOutputType | null
  }

  type GetPromoCodeGroupByPayload<T extends PromoCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PromoCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PromoCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PromoCodeGroupByOutputType[P]>
            : GetScalarType<T[P], PromoCodeGroupByOutputType[P]>
        }
      >
    >


  export type PromoCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    plan?: boolean
    days?: boolean
    maxUses?: boolean
    usedCount?: boolean
    expiresAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    uses?: boolean | PromoCode$usesArgs<ExtArgs>
    _count?: boolean | PromoCodeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["promoCode"]>

  export type PromoCodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    plan?: boolean
    days?: boolean
    maxUses?: boolean
    usedCount?: boolean
    expiresAt?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["promoCode"]>

  export type PromoCodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    plan?: boolean
    days?: boolean
    maxUses?: boolean
    usedCount?: boolean
    expiresAt?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["promoCode"]>

  export type PromoCodeSelectScalar = {
    id?: boolean
    code?: boolean
    plan?: boolean
    days?: boolean
    maxUses?: boolean
    usedCount?: boolean
    expiresAt?: boolean
    isActive?: boolean
    createdAt?: boolean
  }

  export type PromoCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "plan" | "days" | "maxUses" | "usedCount" | "expiresAt" | "isActive" | "createdAt", ExtArgs["result"]["promoCode"]>
  export type PromoCodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uses?: boolean | PromoCode$usesArgs<ExtArgs>
    _count?: boolean | PromoCodeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PromoCodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PromoCodeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PromoCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PromoCode"
    objects: {
      uses: Prisma.$PromoCodeUsePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      plan: $Enums.Plan
      days: number
      maxUses: number
      usedCount: number
      expiresAt: Date | null
      isActive: boolean
      createdAt: Date
    }, ExtArgs["result"]["promoCode"]>
    composites: {}
  }

  type PromoCodeGetPayload<S extends boolean | null | undefined | PromoCodeDefaultArgs> = $Result.GetResult<Prisma.$PromoCodePayload, S>

  type PromoCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PromoCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PromoCodeCountAggregateInputType | true
    }

  export interface PromoCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PromoCode'], meta: { name: 'PromoCode' } }
    /**
     * Find zero or one PromoCode that matches the filter.
     * @param {PromoCodeFindUniqueArgs} args - Arguments to find a PromoCode
     * @example
     * // Get one PromoCode
     * const promoCode = await prisma.promoCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PromoCodeFindUniqueArgs>(args: SelectSubset<T, PromoCodeFindUniqueArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PromoCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PromoCodeFindUniqueOrThrowArgs} args - Arguments to find a PromoCode
     * @example
     * // Get one PromoCode
     * const promoCode = await prisma.promoCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PromoCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, PromoCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PromoCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeFindFirstArgs} args - Arguments to find a PromoCode
     * @example
     * // Get one PromoCode
     * const promoCode = await prisma.promoCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PromoCodeFindFirstArgs>(args?: SelectSubset<T, PromoCodeFindFirstArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PromoCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeFindFirstOrThrowArgs} args - Arguments to find a PromoCode
     * @example
     * // Get one PromoCode
     * const promoCode = await prisma.promoCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PromoCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, PromoCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PromoCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PromoCodes
     * const promoCodes = await prisma.promoCode.findMany()
     * 
     * // Get first 10 PromoCodes
     * const promoCodes = await prisma.promoCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const promoCodeWithIdOnly = await prisma.promoCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PromoCodeFindManyArgs>(args?: SelectSubset<T, PromoCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PromoCode.
     * @param {PromoCodeCreateArgs} args - Arguments to create a PromoCode.
     * @example
     * // Create one PromoCode
     * const PromoCode = await prisma.promoCode.create({
     *   data: {
     *     // ... data to create a PromoCode
     *   }
     * })
     * 
     */
    create<T extends PromoCodeCreateArgs>(args: SelectSubset<T, PromoCodeCreateArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PromoCodes.
     * @param {PromoCodeCreateManyArgs} args - Arguments to create many PromoCodes.
     * @example
     * // Create many PromoCodes
     * const promoCode = await prisma.promoCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PromoCodeCreateManyArgs>(args?: SelectSubset<T, PromoCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PromoCodes and returns the data saved in the database.
     * @param {PromoCodeCreateManyAndReturnArgs} args - Arguments to create many PromoCodes.
     * @example
     * // Create many PromoCodes
     * const promoCode = await prisma.promoCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PromoCodes and only return the `id`
     * const promoCodeWithIdOnly = await prisma.promoCode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PromoCodeCreateManyAndReturnArgs>(args?: SelectSubset<T, PromoCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PromoCode.
     * @param {PromoCodeDeleteArgs} args - Arguments to delete one PromoCode.
     * @example
     * // Delete one PromoCode
     * const PromoCode = await prisma.promoCode.delete({
     *   where: {
     *     // ... filter to delete one PromoCode
     *   }
     * })
     * 
     */
    delete<T extends PromoCodeDeleteArgs>(args: SelectSubset<T, PromoCodeDeleteArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PromoCode.
     * @param {PromoCodeUpdateArgs} args - Arguments to update one PromoCode.
     * @example
     * // Update one PromoCode
     * const promoCode = await prisma.promoCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PromoCodeUpdateArgs>(args: SelectSubset<T, PromoCodeUpdateArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PromoCodes.
     * @param {PromoCodeDeleteManyArgs} args - Arguments to filter PromoCodes to delete.
     * @example
     * // Delete a few PromoCodes
     * const { count } = await prisma.promoCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PromoCodeDeleteManyArgs>(args?: SelectSubset<T, PromoCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PromoCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PromoCodes
     * const promoCode = await prisma.promoCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PromoCodeUpdateManyArgs>(args: SelectSubset<T, PromoCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PromoCodes and returns the data updated in the database.
     * @param {PromoCodeUpdateManyAndReturnArgs} args - Arguments to update many PromoCodes.
     * @example
     * // Update many PromoCodes
     * const promoCode = await prisma.promoCode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PromoCodes and only return the `id`
     * const promoCodeWithIdOnly = await prisma.promoCode.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PromoCodeUpdateManyAndReturnArgs>(args: SelectSubset<T, PromoCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PromoCode.
     * @param {PromoCodeUpsertArgs} args - Arguments to update or create a PromoCode.
     * @example
     * // Update or create a PromoCode
     * const promoCode = await prisma.promoCode.upsert({
     *   create: {
     *     // ... data to create a PromoCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PromoCode we want to update
     *   }
     * })
     */
    upsert<T extends PromoCodeUpsertArgs>(args: SelectSubset<T, PromoCodeUpsertArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PromoCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeCountArgs} args - Arguments to filter PromoCodes to count.
     * @example
     * // Count the number of PromoCodes
     * const count = await prisma.promoCode.count({
     *   where: {
     *     // ... the filter for the PromoCodes we want to count
     *   }
     * })
    **/
    count<T extends PromoCodeCountArgs>(
      args?: Subset<T, PromoCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PromoCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PromoCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PromoCodeAggregateArgs>(args: Subset<T, PromoCodeAggregateArgs>): Prisma.PrismaPromise<GetPromoCodeAggregateType<T>>

    /**
     * Group by PromoCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PromoCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PromoCodeGroupByArgs['orderBy'] }
        : { orderBy?: PromoCodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PromoCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPromoCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PromoCode model
   */
  readonly fields: PromoCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PromoCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PromoCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    uses<T extends PromoCode$usesArgs<ExtArgs> = {}>(args?: Subset<T, PromoCode$usesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromoCodeUsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PromoCode model
   */
  interface PromoCodeFieldRefs {
    readonly id: FieldRef<"PromoCode", 'Int'>
    readonly code: FieldRef<"PromoCode", 'String'>
    readonly plan: FieldRef<"PromoCode", 'Plan'>
    readonly days: FieldRef<"PromoCode", 'Int'>
    readonly maxUses: FieldRef<"PromoCode", 'Int'>
    readonly usedCount: FieldRef<"PromoCode", 'Int'>
    readonly expiresAt: FieldRef<"PromoCode", 'DateTime'>
    readonly isActive: FieldRef<"PromoCode", 'Boolean'>
    readonly createdAt: FieldRef<"PromoCode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PromoCode findUnique
   */
  export type PromoCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * Filter, which PromoCode to fetch.
     */
    where: PromoCodeWhereUniqueInput
  }

  /**
   * PromoCode findUniqueOrThrow
   */
  export type PromoCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * Filter, which PromoCode to fetch.
     */
    where: PromoCodeWhereUniqueInput
  }

  /**
   * PromoCode findFirst
   */
  export type PromoCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * Filter, which PromoCode to fetch.
     */
    where?: PromoCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PromoCodes to fetch.
     */
    orderBy?: PromoCodeOrderByWithRelationInput | PromoCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PromoCodes.
     */
    cursor?: PromoCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PromoCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PromoCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PromoCodes.
     */
    distinct?: PromoCodeScalarFieldEnum | PromoCodeScalarFieldEnum[]
  }

  /**
   * PromoCode findFirstOrThrow
   */
  export type PromoCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * Filter, which PromoCode to fetch.
     */
    where?: PromoCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PromoCodes to fetch.
     */
    orderBy?: PromoCodeOrderByWithRelationInput | PromoCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PromoCodes.
     */
    cursor?: PromoCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PromoCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PromoCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PromoCodes.
     */
    distinct?: PromoCodeScalarFieldEnum | PromoCodeScalarFieldEnum[]
  }

  /**
   * PromoCode findMany
   */
  export type PromoCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * Filter, which PromoCodes to fetch.
     */
    where?: PromoCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PromoCodes to fetch.
     */
    orderBy?: PromoCodeOrderByWithRelationInput | PromoCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PromoCodes.
     */
    cursor?: PromoCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PromoCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PromoCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PromoCodes.
     */
    distinct?: PromoCodeScalarFieldEnum | PromoCodeScalarFieldEnum[]
  }

  /**
   * PromoCode create
   */
  export type PromoCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * The data needed to create a PromoCode.
     */
    data: XOR<PromoCodeCreateInput, PromoCodeUncheckedCreateInput>
  }

  /**
   * PromoCode createMany
   */
  export type PromoCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PromoCodes.
     */
    data: PromoCodeCreateManyInput | PromoCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PromoCode createManyAndReturn
   */
  export type PromoCodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * The data used to create many PromoCodes.
     */
    data: PromoCodeCreateManyInput | PromoCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PromoCode update
   */
  export type PromoCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * The data needed to update a PromoCode.
     */
    data: XOR<PromoCodeUpdateInput, PromoCodeUncheckedUpdateInput>
    /**
     * Choose, which PromoCode to update.
     */
    where: PromoCodeWhereUniqueInput
  }

  /**
   * PromoCode updateMany
   */
  export type PromoCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PromoCodes.
     */
    data: XOR<PromoCodeUpdateManyMutationInput, PromoCodeUncheckedUpdateManyInput>
    /**
     * Filter which PromoCodes to update
     */
    where?: PromoCodeWhereInput
    /**
     * Limit how many PromoCodes to update.
     */
    limit?: number
  }

  /**
   * PromoCode updateManyAndReturn
   */
  export type PromoCodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * The data used to update PromoCodes.
     */
    data: XOR<PromoCodeUpdateManyMutationInput, PromoCodeUncheckedUpdateManyInput>
    /**
     * Filter which PromoCodes to update
     */
    where?: PromoCodeWhereInput
    /**
     * Limit how many PromoCodes to update.
     */
    limit?: number
  }

  /**
   * PromoCode upsert
   */
  export type PromoCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * The filter to search for the PromoCode to update in case it exists.
     */
    where: PromoCodeWhereUniqueInput
    /**
     * In case the PromoCode found by the `where` argument doesn't exist, create a new PromoCode with this data.
     */
    create: XOR<PromoCodeCreateInput, PromoCodeUncheckedCreateInput>
    /**
     * In case the PromoCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PromoCodeUpdateInput, PromoCodeUncheckedUpdateInput>
  }

  /**
   * PromoCode delete
   */
  export type PromoCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * Filter which PromoCode to delete.
     */
    where: PromoCodeWhereUniqueInput
  }

  /**
   * PromoCode deleteMany
   */
  export type PromoCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PromoCodes to delete
     */
    where?: PromoCodeWhereInput
    /**
     * Limit how many PromoCodes to delete.
     */
    limit?: number
  }

  /**
   * PromoCode.uses
   */
  export type PromoCode$usesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUse
     */
    select?: PromoCodeUseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUse
     */
    omit?: PromoCodeUseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUseInclude<ExtArgs> | null
    where?: PromoCodeUseWhereInput
    orderBy?: PromoCodeUseOrderByWithRelationInput | PromoCodeUseOrderByWithRelationInput[]
    cursor?: PromoCodeUseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PromoCodeUseScalarFieldEnum | PromoCodeUseScalarFieldEnum[]
  }

  /**
   * PromoCode without action
   */
  export type PromoCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
  }


  /**
   * Model PromoCodeUse
   */

  export type AggregatePromoCodeUse = {
    _count: PromoCodeUseCountAggregateOutputType | null
    _avg: PromoCodeUseAvgAggregateOutputType | null
    _sum: PromoCodeUseSumAggregateOutputType | null
    _min: PromoCodeUseMinAggregateOutputType | null
    _max: PromoCodeUseMaxAggregateOutputType | null
  }

  export type PromoCodeUseAvgAggregateOutputType = {
    id: number | null
    promoCodeId: number | null
    userId: number | null
  }

  export type PromoCodeUseSumAggregateOutputType = {
    id: number | null
    promoCodeId: number | null
    userId: number | null
  }

  export type PromoCodeUseMinAggregateOutputType = {
    id: number | null
    promoCodeId: number | null
    userId: number | null
    usedAt: Date | null
  }

  export type PromoCodeUseMaxAggregateOutputType = {
    id: number | null
    promoCodeId: number | null
    userId: number | null
    usedAt: Date | null
  }

  export type PromoCodeUseCountAggregateOutputType = {
    id: number
    promoCodeId: number
    userId: number
    usedAt: number
    _all: number
  }


  export type PromoCodeUseAvgAggregateInputType = {
    id?: true
    promoCodeId?: true
    userId?: true
  }

  export type PromoCodeUseSumAggregateInputType = {
    id?: true
    promoCodeId?: true
    userId?: true
  }

  export type PromoCodeUseMinAggregateInputType = {
    id?: true
    promoCodeId?: true
    userId?: true
    usedAt?: true
  }

  export type PromoCodeUseMaxAggregateInputType = {
    id?: true
    promoCodeId?: true
    userId?: true
    usedAt?: true
  }

  export type PromoCodeUseCountAggregateInputType = {
    id?: true
    promoCodeId?: true
    userId?: true
    usedAt?: true
    _all?: true
  }

  export type PromoCodeUseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PromoCodeUse to aggregate.
     */
    where?: PromoCodeUseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PromoCodeUses to fetch.
     */
    orderBy?: PromoCodeUseOrderByWithRelationInput | PromoCodeUseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PromoCodeUseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PromoCodeUses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PromoCodeUses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PromoCodeUses
    **/
    _count?: true | PromoCodeUseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PromoCodeUseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PromoCodeUseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PromoCodeUseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PromoCodeUseMaxAggregateInputType
  }

  export type GetPromoCodeUseAggregateType<T extends PromoCodeUseAggregateArgs> = {
        [P in keyof T & keyof AggregatePromoCodeUse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePromoCodeUse[P]>
      : GetScalarType<T[P], AggregatePromoCodeUse[P]>
  }




  export type PromoCodeUseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PromoCodeUseWhereInput
    orderBy?: PromoCodeUseOrderByWithAggregationInput | PromoCodeUseOrderByWithAggregationInput[]
    by: PromoCodeUseScalarFieldEnum[] | PromoCodeUseScalarFieldEnum
    having?: PromoCodeUseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PromoCodeUseCountAggregateInputType | true
    _avg?: PromoCodeUseAvgAggregateInputType
    _sum?: PromoCodeUseSumAggregateInputType
    _min?: PromoCodeUseMinAggregateInputType
    _max?: PromoCodeUseMaxAggregateInputType
  }

  export type PromoCodeUseGroupByOutputType = {
    id: number
    promoCodeId: number
    userId: number
    usedAt: Date
    _count: PromoCodeUseCountAggregateOutputType | null
    _avg: PromoCodeUseAvgAggregateOutputType | null
    _sum: PromoCodeUseSumAggregateOutputType | null
    _min: PromoCodeUseMinAggregateOutputType | null
    _max: PromoCodeUseMaxAggregateOutputType | null
  }

  type GetPromoCodeUseGroupByPayload<T extends PromoCodeUseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PromoCodeUseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PromoCodeUseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PromoCodeUseGroupByOutputType[P]>
            : GetScalarType<T[P], PromoCodeUseGroupByOutputType[P]>
        }
      >
    >


  export type PromoCodeUseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    promoCodeId?: boolean
    userId?: boolean
    usedAt?: boolean
    promoCode?: boolean | PromoCodeDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["promoCodeUse"]>

  export type PromoCodeUseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    promoCodeId?: boolean
    userId?: boolean
    usedAt?: boolean
    promoCode?: boolean | PromoCodeDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["promoCodeUse"]>

  export type PromoCodeUseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    promoCodeId?: boolean
    userId?: boolean
    usedAt?: boolean
    promoCode?: boolean | PromoCodeDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["promoCodeUse"]>

  export type PromoCodeUseSelectScalar = {
    id?: boolean
    promoCodeId?: boolean
    userId?: boolean
    usedAt?: boolean
  }

  export type PromoCodeUseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "promoCodeId" | "userId" | "usedAt", ExtArgs["result"]["promoCodeUse"]>
  export type PromoCodeUseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    promoCode?: boolean | PromoCodeDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PromoCodeUseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    promoCode?: boolean | PromoCodeDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PromoCodeUseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    promoCode?: boolean | PromoCodeDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PromoCodeUsePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PromoCodeUse"
    objects: {
      promoCode: Prisma.$PromoCodePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      promoCodeId: number
      userId: number
      usedAt: Date
    }, ExtArgs["result"]["promoCodeUse"]>
    composites: {}
  }

  type PromoCodeUseGetPayload<S extends boolean | null | undefined | PromoCodeUseDefaultArgs> = $Result.GetResult<Prisma.$PromoCodeUsePayload, S>

  type PromoCodeUseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PromoCodeUseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PromoCodeUseCountAggregateInputType | true
    }

  export interface PromoCodeUseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PromoCodeUse'], meta: { name: 'PromoCodeUse' } }
    /**
     * Find zero or one PromoCodeUse that matches the filter.
     * @param {PromoCodeUseFindUniqueArgs} args - Arguments to find a PromoCodeUse
     * @example
     * // Get one PromoCodeUse
     * const promoCodeUse = await prisma.promoCodeUse.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PromoCodeUseFindUniqueArgs>(args: SelectSubset<T, PromoCodeUseFindUniqueArgs<ExtArgs>>): Prisma__PromoCodeUseClient<$Result.GetResult<Prisma.$PromoCodeUsePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PromoCodeUse that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PromoCodeUseFindUniqueOrThrowArgs} args - Arguments to find a PromoCodeUse
     * @example
     * // Get one PromoCodeUse
     * const promoCodeUse = await prisma.promoCodeUse.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PromoCodeUseFindUniqueOrThrowArgs>(args: SelectSubset<T, PromoCodeUseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PromoCodeUseClient<$Result.GetResult<Prisma.$PromoCodeUsePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PromoCodeUse that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeUseFindFirstArgs} args - Arguments to find a PromoCodeUse
     * @example
     * // Get one PromoCodeUse
     * const promoCodeUse = await prisma.promoCodeUse.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PromoCodeUseFindFirstArgs>(args?: SelectSubset<T, PromoCodeUseFindFirstArgs<ExtArgs>>): Prisma__PromoCodeUseClient<$Result.GetResult<Prisma.$PromoCodeUsePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PromoCodeUse that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeUseFindFirstOrThrowArgs} args - Arguments to find a PromoCodeUse
     * @example
     * // Get one PromoCodeUse
     * const promoCodeUse = await prisma.promoCodeUse.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PromoCodeUseFindFirstOrThrowArgs>(args?: SelectSubset<T, PromoCodeUseFindFirstOrThrowArgs<ExtArgs>>): Prisma__PromoCodeUseClient<$Result.GetResult<Prisma.$PromoCodeUsePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PromoCodeUses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeUseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PromoCodeUses
     * const promoCodeUses = await prisma.promoCodeUse.findMany()
     * 
     * // Get first 10 PromoCodeUses
     * const promoCodeUses = await prisma.promoCodeUse.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const promoCodeUseWithIdOnly = await prisma.promoCodeUse.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PromoCodeUseFindManyArgs>(args?: SelectSubset<T, PromoCodeUseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromoCodeUsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PromoCodeUse.
     * @param {PromoCodeUseCreateArgs} args - Arguments to create a PromoCodeUse.
     * @example
     * // Create one PromoCodeUse
     * const PromoCodeUse = await prisma.promoCodeUse.create({
     *   data: {
     *     // ... data to create a PromoCodeUse
     *   }
     * })
     * 
     */
    create<T extends PromoCodeUseCreateArgs>(args: SelectSubset<T, PromoCodeUseCreateArgs<ExtArgs>>): Prisma__PromoCodeUseClient<$Result.GetResult<Prisma.$PromoCodeUsePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PromoCodeUses.
     * @param {PromoCodeUseCreateManyArgs} args - Arguments to create many PromoCodeUses.
     * @example
     * // Create many PromoCodeUses
     * const promoCodeUse = await prisma.promoCodeUse.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PromoCodeUseCreateManyArgs>(args?: SelectSubset<T, PromoCodeUseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PromoCodeUses and returns the data saved in the database.
     * @param {PromoCodeUseCreateManyAndReturnArgs} args - Arguments to create many PromoCodeUses.
     * @example
     * // Create many PromoCodeUses
     * const promoCodeUse = await prisma.promoCodeUse.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PromoCodeUses and only return the `id`
     * const promoCodeUseWithIdOnly = await prisma.promoCodeUse.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PromoCodeUseCreateManyAndReturnArgs>(args?: SelectSubset<T, PromoCodeUseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromoCodeUsePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PromoCodeUse.
     * @param {PromoCodeUseDeleteArgs} args - Arguments to delete one PromoCodeUse.
     * @example
     * // Delete one PromoCodeUse
     * const PromoCodeUse = await prisma.promoCodeUse.delete({
     *   where: {
     *     // ... filter to delete one PromoCodeUse
     *   }
     * })
     * 
     */
    delete<T extends PromoCodeUseDeleteArgs>(args: SelectSubset<T, PromoCodeUseDeleteArgs<ExtArgs>>): Prisma__PromoCodeUseClient<$Result.GetResult<Prisma.$PromoCodeUsePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PromoCodeUse.
     * @param {PromoCodeUseUpdateArgs} args - Arguments to update one PromoCodeUse.
     * @example
     * // Update one PromoCodeUse
     * const promoCodeUse = await prisma.promoCodeUse.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PromoCodeUseUpdateArgs>(args: SelectSubset<T, PromoCodeUseUpdateArgs<ExtArgs>>): Prisma__PromoCodeUseClient<$Result.GetResult<Prisma.$PromoCodeUsePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PromoCodeUses.
     * @param {PromoCodeUseDeleteManyArgs} args - Arguments to filter PromoCodeUses to delete.
     * @example
     * // Delete a few PromoCodeUses
     * const { count } = await prisma.promoCodeUse.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PromoCodeUseDeleteManyArgs>(args?: SelectSubset<T, PromoCodeUseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PromoCodeUses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeUseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PromoCodeUses
     * const promoCodeUse = await prisma.promoCodeUse.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PromoCodeUseUpdateManyArgs>(args: SelectSubset<T, PromoCodeUseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PromoCodeUses and returns the data updated in the database.
     * @param {PromoCodeUseUpdateManyAndReturnArgs} args - Arguments to update many PromoCodeUses.
     * @example
     * // Update many PromoCodeUses
     * const promoCodeUse = await prisma.promoCodeUse.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PromoCodeUses and only return the `id`
     * const promoCodeUseWithIdOnly = await prisma.promoCodeUse.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PromoCodeUseUpdateManyAndReturnArgs>(args: SelectSubset<T, PromoCodeUseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromoCodeUsePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PromoCodeUse.
     * @param {PromoCodeUseUpsertArgs} args - Arguments to update or create a PromoCodeUse.
     * @example
     * // Update or create a PromoCodeUse
     * const promoCodeUse = await prisma.promoCodeUse.upsert({
     *   create: {
     *     // ... data to create a PromoCodeUse
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PromoCodeUse we want to update
     *   }
     * })
     */
    upsert<T extends PromoCodeUseUpsertArgs>(args: SelectSubset<T, PromoCodeUseUpsertArgs<ExtArgs>>): Prisma__PromoCodeUseClient<$Result.GetResult<Prisma.$PromoCodeUsePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PromoCodeUses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeUseCountArgs} args - Arguments to filter PromoCodeUses to count.
     * @example
     * // Count the number of PromoCodeUses
     * const count = await prisma.promoCodeUse.count({
     *   where: {
     *     // ... the filter for the PromoCodeUses we want to count
     *   }
     * })
    **/
    count<T extends PromoCodeUseCountArgs>(
      args?: Subset<T, PromoCodeUseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PromoCodeUseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PromoCodeUse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeUseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PromoCodeUseAggregateArgs>(args: Subset<T, PromoCodeUseAggregateArgs>): Prisma.PrismaPromise<GetPromoCodeUseAggregateType<T>>

    /**
     * Group by PromoCodeUse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeUseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PromoCodeUseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PromoCodeUseGroupByArgs['orderBy'] }
        : { orderBy?: PromoCodeUseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PromoCodeUseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPromoCodeUseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PromoCodeUse model
   */
  readonly fields: PromoCodeUseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PromoCodeUse.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PromoCodeUseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    promoCode<T extends PromoCodeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PromoCodeDefaultArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PromoCodeUse model
   */
  interface PromoCodeUseFieldRefs {
    readonly id: FieldRef<"PromoCodeUse", 'Int'>
    readonly promoCodeId: FieldRef<"PromoCodeUse", 'Int'>
    readonly userId: FieldRef<"PromoCodeUse", 'Int'>
    readonly usedAt: FieldRef<"PromoCodeUse", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PromoCodeUse findUnique
   */
  export type PromoCodeUseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUse
     */
    select?: PromoCodeUseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUse
     */
    omit?: PromoCodeUseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUseInclude<ExtArgs> | null
    /**
     * Filter, which PromoCodeUse to fetch.
     */
    where: PromoCodeUseWhereUniqueInput
  }

  /**
   * PromoCodeUse findUniqueOrThrow
   */
  export type PromoCodeUseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUse
     */
    select?: PromoCodeUseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUse
     */
    omit?: PromoCodeUseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUseInclude<ExtArgs> | null
    /**
     * Filter, which PromoCodeUse to fetch.
     */
    where: PromoCodeUseWhereUniqueInput
  }

  /**
   * PromoCodeUse findFirst
   */
  export type PromoCodeUseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUse
     */
    select?: PromoCodeUseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUse
     */
    omit?: PromoCodeUseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUseInclude<ExtArgs> | null
    /**
     * Filter, which PromoCodeUse to fetch.
     */
    where?: PromoCodeUseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PromoCodeUses to fetch.
     */
    orderBy?: PromoCodeUseOrderByWithRelationInput | PromoCodeUseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PromoCodeUses.
     */
    cursor?: PromoCodeUseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PromoCodeUses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PromoCodeUses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PromoCodeUses.
     */
    distinct?: PromoCodeUseScalarFieldEnum | PromoCodeUseScalarFieldEnum[]
  }

  /**
   * PromoCodeUse findFirstOrThrow
   */
  export type PromoCodeUseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUse
     */
    select?: PromoCodeUseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUse
     */
    omit?: PromoCodeUseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUseInclude<ExtArgs> | null
    /**
     * Filter, which PromoCodeUse to fetch.
     */
    where?: PromoCodeUseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PromoCodeUses to fetch.
     */
    orderBy?: PromoCodeUseOrderByWithRelationInput | PromoCodeUseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PromoCodeUses.
     */
    cursor?: PromoCodeUseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PromoCodeUses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PromoCodeUses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PromoCodeUses.
     */
    distinct?: PromoCodeUseScalarFieldEnum | PromoCodeUseScalarFieldEnum[]
  }

  /**
   * PromoCodeUse findMany
   */
  export type PromoCodeUseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUse
     */
    select?: PromoCodeUseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUse
     */
    omit?: PromoCodeUseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUseInclude<ExtArgs> | null
    /**
     * Filter, which PromoCodeUses to fetch.
     */
    where?: PromoCodeUseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PromoCodeUses to fetch.
     */
    orderBy?: PromoCodeUseOrderByWithRelationInput | PromoCodeUseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PromoCodeUses.
     */
    cursor?: PromoCodeUseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PromoCodeUses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PromoCodeUses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PromoCodeUses.
     */
    distinct?: PromoCodeUseScalarFieldEnum | PromoCodeUseScalarFieldEnum[]
  }

  /**
   * PromoCodeUse create
   */
  export type PromoCodeUseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUse
     */
    select?: PromoCodeUseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUse
     */
    omit?: PromoCodeUseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUseInclude<ExtArgs> | null
    /**
     * The data needed to create a PromoCodeUse.
     */
    data: XOR<PromoCodeUseCreateInput, PromoCodeUseUncheckedCreateInput>
  }

  /**
   * PromoCodeUse createMany
   */
  export type PromoCodeUseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PromoCodeUses.
     */
    data: PromoCodeUseCreateManyInput | PromoCodeUseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PromoCodeUse createManyAndReturn
   */
  export type PromoCodeUseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUse
     */
    select?: PromoCodeUseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUse
     */
    omit?: PromoCodeUseOmit<ExtArgs> | null
    /**
     * The data used to create many PromoCodeUses.
     */
    data: PromoCodeUseCreateManyInput | PromoCodeUseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PromoCodeUse update
   */
  export type PromoCodeUseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUse
     */
    select?: PromoCodeUseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUse
     */
    omit?: PromoCodeUseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUseInclude<ExtArgs> | null
    /**
     * The data needed to update a PromoCodeUse.
     */
    data: XOR<PromoCodeUseUpdateInput, PromoCodeUseUncheckedUpdateInput>
    /**
     * Choose, which PromoCodeUse to update.
     */
    where: PromoCodeUseWhereUniqueInput
  }

  /**
   * PromoCodeUse updateMany
   */
  export type PromoCodeUseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PromoCodeUses.
     */
    data: XOR<PromoCodeUseUpdateManyMutationInput, PromoCodeUseUncheckedUpdateManyInput>
    /**
     * Filter which PromoCodeUses to update
     */
    where?: PromoCodeUseWhereInput
    /**
     * Limit how many PromoCodeUses to update.
     */
    limit?: number
  }

  /**
   * PromoCodeUse updateManyAndReturn
   */
  export type PromoCodeUseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUse
     */
    select?: PromoCodeUseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUse
     */
    omit?: PromoCodeUseOmit<ExtArgs> | null
    /**
     * The data used to update PromoCodeUses.
     */
    data: XOR<PromoCodeUseUpdateManyMutationInput, PromoCodeUseUncheckedUpdateManyInput>
    /**
     * Filter which PromoCodeUses to update
     */
    where?: PromoCodeUseWhereInput
    /**
     * Limit how many PromoCodeUses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PromoCodeUse upsert
   */
  export type PromoCodeUseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUse
     */
    select?: PromoCodeUseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUse
     */
    omit?: PromoCodeUseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUseInclude<ExtArgs> | null
    /**
     * The filter to search for the PromoCodeUse to update in case it exists.
     */
    where: PromoCodeUseWhereUniqueInput
    /**
     * In case the PromoCodeUse found by the `where` argument doesn't exist, create a new PromoCodeUse with this data.
     */
    create: XOR<PromoCodeUseCreateInput, PromoCodeUseUncheckedCreateInput>
    /**
     * In case the PromoCodeUse was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PromoCodeUseUpdateInput, PromoCodeUseUncheckedUpdateInput>
  }

  /**
   * PromoCodeUse delete
   */
  export type PromoCodeUseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUse
     */
    select?: PromoCodeUseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUse
     */
    omit?: PromoCodeUseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUseInclude<ExtArgs> | null
    /**
     * Filter which PromoCodeUse to delete.
     */
    where: PromoCodeUseWhereUniqueInput
  }

  /**
   * PromoCodeUse deleteMany
   */
  export type PromoCodeUseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PromoCodeUses to delete
     */
    where?: PromoCodeUseWhereInput
    /**
     * Limit how many PromoCodeUses to delete.
     */
    limit?: number
  }

  /**
   * PromoCodeUse without action
   */
  export type PromoCodeUseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUse
     */
    select?: PromoCodeUseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUse
     */
    omit?: PromoCodeUseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUseInclude<ExtArgs> | null
  }


  /**
   * Model Referral
   */

  export type AggregateReferral = {
    _count: ReferralCountAggregateOutputType | null
    _avg: ReferralAvgAggregateOutputType | null
    _sum: ReferralSumAggregateOutputType | null
    _min: ReferralMinAggregateOutputType | null
    _max: ReferralMaxAggregateOutputType | null
  }

  export type ReferralAvgAggregateOutputType = {
    id: number | null
    referrerId: number | null
    referredId: number | null
    bonusDays: number | null
  }

  export type ReferralSumAggregateOutputType = {
    id: number | null
    referrerId: number | null
    referredId: number | null
    bonusDays: number | null
  }

  export type ReferralMinAggregateOutputType = {
    id: number | null
    referrerId: number | null
    referredId: number | null
    bonusDays: number | null
    createdAt: Date | null
  }

  export type ReferralMaxAggregateOutputType = {
    id: number | null
    referrerId: number | null
    referredId: number | null
    bonusDays: number | null
    createdAt: Date | null
  }

  export type ReferralCountAggregateOutputType = {
    id: number
    referrerId: number
    referredId: number
    bonusDays: number
    createdAt: number
    _all: number
  }


  export type ReferralAvgAggregateInputType = {
    id?: true
    referrerId?: true
    referredId?: true
    bonusDays?: true
  }

  export type ReferralSumAggregateInputType = {
    id?: true
    referrerId?: true
    referredId?: true
    bonusDays?: true
  }

  export type ReferralMinAggregateInputType = {
    id?: true
    referrerId?: true
    referredId?: true
    bonusDays?: true
    createdAt?: true
  }

  export type ReferralMaxAggregateInputType = {
    id?: true
    referrerId?: true
    referredId?: true
    bonusDays?: true
    createdAt?: true
  }

  export type ReferralCountAggregateInputType = {
    id?: true
    referrerId?: true
    referredId?: true
    bonusDays?: true
    createdAt?: true
    _all?: true
  }

  export type ReferralAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Referral to aggregate.
     */
    where?: ReferralWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Referrals to fetch.
     */
    orderBy?: ReferralOrderByWithRelationInput | ReferralOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReferralWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Referrals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Referrals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Referrals
    **/
    _count?: true | ReferralCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReferralAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReferralSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReferralMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReferralMaxAggregateInputType
  }

  export type GetReferralAggregateType<T extends ReferralAggregateArgs> = {
        [P in keyof T & keyof AggregateReferral]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReferral[P]>
      : GetScalarType<T[P], AggregateReferral[P]>
  }




  export type ReferralGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReferralWhereInput
    orderBy?: ReferralOrderByWithAggregationInput | ReferralOrderByWithAggregationInput[]
    by: ReferralScalarFieldEnum[] | ReferralScalarFieldEnum
    having?: ReferralScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReferralCountAggregateInputType | true
    _avg?: ReferralAvgAggregateInputType
    _sum?: ReferralSumAggregateInputType
    _min?: ReferralMinAggregateInputType
    _max?: ReferralMaxAggregateInputType
  }

  export type ReferralGroupByOutputType = {
    id: number
    referrerId: number
    referredId: number
    bonusDays: number
    createdAt: Date
    _count: ReferralCountAggregateOutputType | null
    _avg: ReferralAvgAggregateOutputType | null
    _sum: ReferralSumAggregateOutputType | null
    _min: ReferralMinAggregateOutputType | null
    _max: ReferralMaxAggregateOutputType | null
  }

  type GetReferralGroupByPayload<T extends ReferralGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReferralGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReferralGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReferralGroupByOutputType[P]>
            : GetScalarType<T[P], ReferralGroupByOutputType[P]>
        }
      >
    >


  export type ReferralSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    referrerId?: boolean
    referredId?: boolean
    bonusDays?: boolean
    createdAt?: boolean
    referrer?: boolean | UserDefaultArgs<ExtArgs>
    referred?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["referral"]>

  export type ReferralSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    referrerId?: boolean
    referredId?: boolean
    bonusDays?: boolean
    createdAt?: boolean
    referrer?: boolean | UserDefaultArgs<ExtArgs>
    referred?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["referral"]>

  export type ReferralSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    referrerId?: boolean
    referredId?: boolean
    bonusDays?: boolean
    createdAt?: boolean
    referrer?: boolean | UserDefaultArgs<ExtArgs>
    referred?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["referral"]>

  export type ReferralSelectScalar = {
    id?: boolean
    referrerId?: boolean
    referredId?: boolean
    bonusDays?: boolean
    createdAt?: boolean
  }

  export type ReferralOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "referrerId" | "referredId" | "bonusDays" | "createdAt", ExtArgs["result"]["referral"]>
  export type ReferralInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    referrer?: boolean | UserDefaultArgs<ExtArgs>
    referred?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReferralIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    referrer?: boolean | UserDefaultArgs<ExtArgs>
    referred?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReferralIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    referrer?: boolean | UserDefaultArgs<ExtArgs>
    referred?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ReferralPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Referral"
    objects: {
      referrer: Prisma.$UserPayload<ExtArgs>
      referred: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      referrerId: number
      referredId: number
      bonusDays: number
      createdAt: Date
    }, ExtArgs["result"]["referral"]>
    composites: {}
  }

  type ReferralGetPayload<S extends boolean | null | undefined | ReferralDefaultArgs> = $Result.GetResult<Prisma.$ReferralPayload, S>

  type ReferralCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReferralFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReferralCountAggregateInputType | true
    }

  export interface ReferralDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Referral'], meta: { name: 'Referral' } }
    /**
     * Find zero or one Referral that matches the filter.
     * @param {ReferralFindUniqueArgs} args - Arguments to find a Referral
     * @example
     * // Get one Referral
     * const referral = await prisma.referral.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReferralFindUniqueArgs>(args: SelectSubset<T, ReferralFindUniqueArgs<ExtArgs>>): Prisma__ReferralClient<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Referral that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReferralFindUniqueOrThrowArgs} args - Arguments to find a Referral
     * @example
     * // Get one Referral
     * const referral = await prisma.referral.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReferralFindUniqueOrThrowArgs>(args: SelectSubset<T, ReferralFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReferralClient<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Referral that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralFindFirstArgs} args - Arguments to find a Referral
     * @example
     * // Get one Referral
     * const referral = await prisma.referral.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReferralFindFirstArgs>(args?: SelectSubset<T, ReferralFindFirstArgs<ExtArgs>>): Prisma__ReferralClient<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Referral that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralFindFirstOrThrowArgs} args - Arguments to find a Referral
     * @example
     * // Get one Referral
     * const referral = await prisma.referral.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReferralFindFirstOrThrowArgs>(args?: SelectSubset<T, ReferralFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReferralClient<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Referrals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Referrals
     * const referrals = await prisma.referral.findMany()
     * 
     * // Get first 10 Referrals
     * const referrals = await prisma.referral.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const referralWithIdOnly = await prisma.referral.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReferralFindManyArgs>(args?: SelectSubset<T, ReferralFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Referral.
     * @param {ReferralCreateArgs} args - Arguments to create a Referral.
     * @example
     * // Create one Referral
     * const Referral = await prisma.referral.create({
     *   data: {
     *     // ... data to create a Referral
     *   }
     * })
     * 
     */
    create<T extends ReferralCreateArgs>(args: SelectSubset<T, ReferralCreateArgs<ExtArgs>>): Prisma__ReferralClient<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Referrals.
     * @param {ReferralCreateManyArgs} args - Arguments to create many Referrals.
     * @example
     * // Create many Referrals
     * const referral = await prisma.referral.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReferralCreateManyArgs>(args?: SelectSubset<T, ReferralCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Referrals and returns the data saved in the database.
     * @param {ReferralCreateManyAndReturnArgs} args - Arguments to create many Referrals.
     * @example
     * // Create many Referrals
     * const referral = await prisma.referral.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Referrals and only return the `id`
     * const referralWithIdOnly = await prisma.referral.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReferralCreateManyAndReturnArgs>(args?: SelectSubset<T, ReferralCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Referral.
     * @param {ReferralDeleteArgs} args - Arguments to delete one Referral.
     * @example
     * // Delete one Referral
     * const Referral = await prisma.referral.delete({
     *   where: {
     *     // ... filter to delete one Referral
     *   }
     * })
     * 
     */
    delete<T extends ReferralDeleteArgs>(args: SelectSubset<T, ReferralDeleteArgs<ExtArgs>>): Prisma__ReferralClient<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Referral.
     * @param {ReferralUpdateArgs} args - Arguments to update one Referral.
     * @example
     * // Update one Referral
     * const referral = await prisma.referral.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReferralUpdateArgs>(args: SelectSubset<T, ReferralUpdateArgs<ExtArgs>>): Prisma__ReferralClient<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Referrals.
     * @param {ReferralDeleteManyArgs} args - Arguments to filter Referrals to delete.
     * @example
     * // Delete a few Referrals
     * const { count } = await prisma.referral.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReferralDeleteManyArgs>(args?: SelectSubset<T, ReferralDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Referrals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Referrals
     * const referral = await prisma.referral.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReferralUpdateManyArgs>(args: SelectSubset<T, ReferralUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Referrals and returns the data updated in the database.
     * @param {ReferralUpdateManyAndReturnArgs} args - Arguments to update many Referrals.
     * @example
     * // Update many Referrals
     * const referral = await prisma.referral.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Referrals and only return the `id`
     * const referralWithIdOnly = await prisma.referral.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReferralUpdateManyAndReturnArgs>(args: SelectSubset<T, ReferralUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Referral.
     * @param {ReferralUpsertArgs} args - Arguments to update or create a Referral.
     * @example
     * // Update or create a Referral
     * const referral = await prisma.referral.upsert({
     *   create: {
     *     // ... data to create a Referral
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Referral we want to update
     *   }
     * })
     */
    upsert<T extends ReferralUpsertArgs>(args: SelectSubset<T, ReferralUpsertArgs<ExtArgs>>): Prisma__ReferralClient<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Referrals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralCountArgs} args - Arguments to filter Referrals to count.
     * @example
     * // Count the number of Referrals
     * const count = await prisma.referral.count({
     *   where: {
     *     // ... the filter for the Referrals we want to count
     *   }
     * })
    **/
    count<T extends ReferralCountArgs>(
      args?: Subset<T, ReferralCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReferralCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Referral.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReferralAggregateArgs>(args: Subset<T, ReferralAggregateArgs>): Prisma.PrismaPromise<GetReferralAggregateType<T>>

    /**
     * Group by Referral.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReferralGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReferralGroupByArgs['orderBy'] }
        : { orderBy?: ReferralGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReferralGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReferralGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Referral model
   */
  readonly fields: ReferralFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Referral.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReferralClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    referrer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    referred<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Referral model
   */
  interface ReferralFieldRefs {
    readonly id: FieldRef<"Referral", 'Int'>
    readonly referrerId: FieldRef<"Referral", 'Int'>
    readonly referredId: FieldRef<"Referral", 'Int'>
    readonly bonusDays: FieldRef<"Referral", 'Int'>
    readonly createdAt: FieldRef<"Referral", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Referral findUnique
   */
  export type ReferralFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * Filter, which Referral to fetch.
     */
    where: ReferralWhereUniqueInput
  }

  /**
   * Referral findUniqueOrThrow
   */
  export type ReferralFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * Filter, which Referral to fetch.
     */
    where: ReferralWhereUniqueInput
  }

  /**
   * Referral findFirst
   */
  export type ReferralFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * Filter, which Referral to fetch.
     */
    where?: ReferralWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Referrals to fetch.
     */
    orderBy?: ReferralOrderByWithRelationInput | ReferralOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Referrals.
     */
    cursor?: ReferralWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Referrals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Referrals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Referrals.
     */
    distinct?: ReferralScalarFieldEnum | ReferralScalarFieldEnum[]
  }

  /**
   * Referral findFirstOrThrow
   */
  export type ReferralFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * Filter, which Referral to fetch.
     */
    where?: ReferralWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Referrals to fetch.
     */
    orderBy?: ReferralOrderByWithRelationInput | ReferralOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Referrals.
     */
    cursor?: ReferralWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Referrals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Referrals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Referrals.
     */
    distinct?: ReferralScalarFieldEnum | ReferralScalarFieldEnum[]
  }

  /**
   * Referral findMany
   */
  export type ReferralFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * Filter, which Referrals to fetch.
     */
    where?: ReferralWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Referrals to fetch.
     */
    orderBy?: ReferralOrderByWithRelationInput | ReferralOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Referrals.
     */
    cursor?: ReferralWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Referrals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Referrals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Referrals.
     */
    distinct?: ReferralScalarFieldEnum | ReferralScalarFieldEnum[]
  }

  /**
   * Referral create
   */
  export type ReferralCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * The data needed to create a Referral.
     */
    data: XOR<ReferralCreateInput, ReferralUncheckedCreateInput>
  }

  /**
   * Referral createMany
   */
  export type ReferralCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Referrals.
     */
    data: ReferralCreateManyInput | ReferralCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Referral createManyAndReturn
   */
  export type ReferralCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * The data used to create many Referrals.
     */
    data: ReferralCreateManyInput | ReferralCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Referral update
   */
  export type ReferralUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * The data needed to update a Referral.
     */
    data: XOR<ReferralUpdateInput, ReferralUncheckedUpdateInput>
    /**
     * Choose, which Referral to update.
     */
    where: ReferralWhereUniqueInput
  }

  /**
   * Referral updateMany
   */
  export type ReferralUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Referrals.
     */
    data: XOR<ReferralUpdateManyMutationInput, ReferralUncheckedUpdateManyInput>
    /**
     * Filter which Referrals to update
     */
    where?: ReferralWhereInput
    /**
     * Limit how many Referrals to update.
     */
    limit?: number
  }

  /**
   * Referral updateManyAndReturn
   */
  export type ReferralUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * The data used to update Referrals.
     */
    data: XOR<ReferralUpdateManyMutationInput, ReferralUncheckedUpdateManyInput>
    /**
     * Filter which Referrals to update
     */
    where?: ReferralWhereInput
    /**
     * Limit how many Referrals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Referral upsert
   */
  export type ReferralUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * The filter to search for the Referral to update in case it exists.
     */
    where: ReferralWhereUniqueInput
    /**
     * In case the Referral found by the `where` argument doesn't exist, create a new Referral with this data.
     */
    create: XOR<ReferralCreateInput, ReferralUncheckedCreateInput>
    /**
     * In case the Referral was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReferralUpdateInput, ReferralUncheckedUpdateInput>
  }

  /**
   * Referral delete
   */
  export type ReferralDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * Filter which Referral to delete.
     */
    where: ReferralWhereUniqueInput
  }

  /**
   * Referral deleteMany
   */
  export type ReferralDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Referrals to delete
     */
    where?: ReferralWhereInput
    /**
     * Limit how many Referrals to delete.
     */
    limit?: number
  }

  /**
   * Referral without action
   */
  export type ReferralDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referral
     */
    omit?: ReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
  }


  /**
   * Model AdminLog
   */

  export type AggregateAdminLog = {
    _count: AdminLogCountAggregateOutputType | null
    _avg: AdminLogAvgAggregateOutputType | null
    _sum: AdminLogSumAggregateOutputType | null
    _min: AdminLogMinAggregateOutputType | null
    _max: AdminLogMaxAggregateOutputType | null
  }

  export type AdminLogAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type AdminLogSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type AdminLogMinAggregateOutputType = {
    id: number | null
    userId: number | null
    action: string | null
    details: string | null
    createdAt: Date | null
  }

  export type AdminLogMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    action: string | null
    details: string | null
    createdAt: Date | null
  }

  export type AdminLogCountAggregateOutputType = {
    id: number
    userId: number
    action: number
    details: number
    createdAt: number
    _all: number
  }


  export type AdminLogAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type AdminLogSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type AdminLogMinAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    details?: true
    createdAt?: true
  }

  export type AdminLogMaxAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    details?: true
    createdAt?: true
  }

  export type AdminLogCountAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    details?: true
    createdAt?: true
    _all?: true
  }

  export type AdminLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminLog to aggregate.
     */
    where?: AdminLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminLogs to fetch.
     */
    orderBy?: AdminLogOrderByWithRelationInput | AdminLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminLogs
    **/
    _count?: true | AdminLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdminLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdminLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminLogMaxAggregateInputType
  }

  export type GetAdminLogAggregateType<T extends AdminLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminLog[P]>
      : GetScalarType<T[P], AggregateAdminLog[P]>
  }




  export type AdminLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminLogWhereInput
    orderBy?: AdminLogOrderByWithAggregationInput | AdminLogOrderByWithAggregationInput[]
    by: AdminLogScalarFieldEnum[] | AdminLogScalarFieldEnum
    having?: AdminLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminLogCountAggregateInputType | true
    _avg?: AdminLogAvgAggregateInputType
    _sum?: AdminLogSumAggregateInputType
    _min?: AdminLogMinAggregateInputType
    _max?: AdminLogMaxAggregateInputType
  }

  export type AdminLogGroupByOutputType = {
    id: number
    userId: number | null
    action: string
    details: string | null
    createdAt: Date
    _count: AdminLogCountAggregateOutputType | null
    _avg: AdminLogAvgAggregateOutputType | null
    _sum: AdminLogSumAggregateOutputType | null
    _min: AdminLogMinAggregateOutputType | null
    _max: AdminLogMaxAggregateOutputType | null
  }

  type GetAdminLogGroupByPayload<T extends AdminLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminLogGroupByOutputType[P]>
            : GetScalarType<T[P], AdminLogGroupByOutputType[P]>
        }
      >
    >


  export type AdminLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    details?: boolean
    createdAt?: boolean
    user?: boolean | AdminLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["adminLog"]>

  export type AdminLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    details?: boolean
    createdAt?: boolean
    user?: boolean | AdminLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["adminLog"]>

  export type AdminLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    details?: boolean
    createdAt?: boolean
    user?: boolean | AdminLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["adminLog"]>

  export type AdminLogSelectScalar = {
    id?: boolean
    userId?: boolean
    action?: boolean
    details?: boolean
    createdAt?: boolean
  }

  export type AdminLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "action" | "details" | "createdAt", ExtArgs["result"]["adminLog"]>
  export type AdminLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AdminLog$userArgs<ExtArgs>
  }
  export type AdminLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AdminLog$userArgs<ExtArgs>
  }
  export type AdminLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AdminLog$userArgs<ExtArgs>
  }

  export type $AdminLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number | null
      action: string
      details: string | null
      createdAt: Date
    }, ExtArgs["result"]["adminLog"]>
    composites: {}
  }

  type AdminLogGetPayload<S extends boolean | null | undefined | AdminLogDefaultArgs> = $Result.GetResult<Prisma.$AdminLogPayload, S>

  type AdminLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminLogCountAggregateInputType | true
    }

  export interface AdminLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminLog'], meta: { name: 'AdminLog' } }
    /**
     * Find zero or one AdminLog that matches the filter.
     * @param {AdminLogFindUniqueArgs} args - Arguments to find a AdminLog
     * @example
     * // Get one AdminLog
     * const adminLog = await prisma.adminLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminLogFindUniqueArgs>(args: SelectSubset<T, AdminLogFindUniqueArgs<ExtArgs>>): Prisma__AdminLogClient<$Result.GetResult<Prisma.$AdminLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AdminLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminLogFindUniqueOrThrowArgs} args - Arguments to find a AdminLog
     * @example
     * // Get one AdminLog
     * const adminLog = await prisma.adminLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminLogClient<$Result.GetResult<Prisma.$AdminLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminLogFindFirstArgs} args - Arguments to find a AdminLog
     * @example
     * // Get one AdminLog
     * const adminLog = await prisma.adminLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminLogFindFirstArgs>(args?: SelectSubset<T, AdminLogFindFirstArgs<ExtArgs>>): Prisma__AdminLogClient<$Result.GetResult<Prisma.$AdminLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminLogFindFirstOrThrowArgs} args - Arguments to find a AdminLog
     * @example
     * // Get one AdminLog
     * const adminLog = await prisma.adminLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminLogClient<$Result.GetResult<Prisma.$AdminLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AdminLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminLogs
     * const adminLogs = await prisma.adminLog.findMany()
     * 
     * // Get first 10 AdminLogs
     * const adminLogs = await prisma.adminLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminLogWithIdOnly = await prisma.adminLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminLogFindManyArgs>(args?: SelectSubset<T, AdminLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AdminLog.
     * @param {AdminLogCreateArgs} args - Arguments to create a AdminLog.
     * @example
     * // Create one AdminLog
     * const AdminLog = await prisma.adminLog.create({
     *   data: {
     *     // ... data to create a AdminLog
     *   }
     * })
     * 
     */
    create<T extends AdminLogCreateArgs>(args: SelectSubset<T, AdminLogCreateArgs<ExtArgs>>): Prisma__AdminLogClient<$Result.GetResult<Prisma.$AdminLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AdminLogs.
     * @param {AdminLogCreateManyArgs} args - Arguments to create many AdminLogs.
     * @example
     * // Create many AdminLogs
     * const adminLog = await prisma.adminLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminLogCreateManyArgs>(args?: SelectSubset<T, AdminLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminLogs and returns the data saved in the database.
     * @param {AdminLogCreateManyAndReturnArgs} args - Arguments to create many AdminLogs.
     * @example
     * // Create many AdminLogs
     * const adminLog = await prisma.adminLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminLogs and only return the `id`
     * const adminLogWithIdOnly = await prisma.adminLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AdminLog.
     * @param {AdminLogDeleteArgs} args - Arguments to delete one AdminLog.
     * @example
     * // Delete one AdminLog
     * const AdminLog = await prisma.adminLog.delete({
     *   where: {
     *     // ... filter to delete one AdminLog
     *   }
     * })
     * 
     */
    delete<T extends AdminLogDeleteArgs>(args: SelectSubset<T, AdminLogDeleteArgs<ExtArgs>>): Prisma__AdminLogClient<$Result.GetResult<Prisma.$AdminLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AdminLog.
     * @param {AdminLogUpdateArgs} args - Arguments to update one AdminLog.
     * @example
     * // Update one AdminLog
     * const adminLog = await prisma.adminLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminLogUpdateArgs>(args: SelectSubset<T, AdminLogUpdateArgs<ExtArgs>>): Prisma__AdminLogClient<$Result.GetResult<Prisma.$AdminLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AdminLogs.
     * @param {AdminLogDeleteManyArgs} args - Arguments to filter AdminLogs to delete.
     * @example
     * // Delete a few AdminLogs
     * const { count } = await prisma.adminLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminLogDeleteManyArgs>(args?: SelectSubset<T, AdminLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminLogs
     * const adminLog = await prisma.adminLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminLogUpdateManyArgs>(args: SelectSubset<T, AdminLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminLogs and returns the data updated in the database.
     * @param {AdminLogUpdateManyAndReturnArgs} args - Arguments to update many AdminLogs.
     * @example
     * // Update many AdminLogs
     * const adminLog = await prisma.adminLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AdminLogs and only return the `id`
     * const adminLogWithIdOnly = await prisma.adminLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AdminLog.
     * @param {AdminLogUpsertArgs} args - Arguments to update or create a AdminLog.
     * @example
     * // Update or create a AdminLog
     * const adminLog = await prisma.adminLog.upsert({
     *   create: {
     *     // ... data to create a AdminLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminLog we want to update
     *   }
     * })
     */
    upsert<T extends AdminLogUpsertArgs>(args: SelectSubset<T, AdminLogUpsertArgs<ExtArgs>>): Prisma__AdminLogClient<$Result.GetResult<Prisma.$AdminLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AdminLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminLogCountArgs} args - Arguments to filter AdminLogs to count.
     * @example
     * // Count the number of AdminLogs
     * const count = await prisma.adminLog.count({
     *   where: {
     *     // ... the filter for the AdminLogs we want to count
     *   }
     * })
    **/
    count<T extends AdminLogCountArgs>(
      args?: Subset<T, AdminLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminLogAggregateArgs>(args: Subset<T, AdminLogAggregateArgs>): Prisma.PrismaPromise<GetAdminLogAggregateType<T>>

    /**
     * Group by AdminLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminLogGroupByArgs['orderBy'] }
        : { orderBy?: AdminLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminLog model
   */
  readonly fields: AdminLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends AdminLog$userArgs<ExtArgs> = {}>(args?: Subset<T, AdminLog$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdminLog model
   */
  interface AdminLogFieldRefs {
    readonly id: FieldRef<"AdminLog", 'Int'>
    readonly userId: FieldRef<"AdminLog", 'Int'>
    readonly action: FieldRef<"AdminLog", 'String'>
    readonly details: FieldRef<"AdminLog", 'String'>
    readonly createdAt: FieldRef<"AdminLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdminLog findUnique
   */
  export type AdminLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLog
     */
    select?: AdminLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLog
     */
    omit?: AdminLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLogInclude<ExtArgs> | null
    /**
     * Filter, which AdminLog to fetch.
     */
    where: AdminLogWhereUniqueInput
  }

  /**
   * AdminLog findUniqueOrThrow
   */
  export type AdminLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLog
     */
    select?: AdminLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLog
     */
    omit?: AdminLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLogInclude<ExtArgs> | null
    /**
     * Filter, which AdminLog to fetch.
     */
    where: AdminLogWhereUniqueInput
  }

  /**
   * AdminLog findFirst
   */
  export type AdminLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLog
     */
    select?: AdminLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLog
     */
    omit?: AdminLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLogInclude<ExtArgs> | null
    /**
     * Filter, which AdminLog to fetch.
     */
    where?: AdminLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminLogs to fetch.
     */
    orderBy?: AdminLogOrderByWithRelationInput | AdminLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminLogs.
     */
    cursor?: AdminLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminLogs.
     */
    distinct?: AdminLogScalarFieldEnum | AdminLogScalarFieldEnum[]
  }

  /**
   * AdminLog findFirstOrThrow
   */
  export type AdminLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLog
     */
    select?: AdminLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLog
     */
    omit?: AdminLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLogInclude<ExtArgs> | null
    /**
     * Filter, which AdminLog to fetch.
     */
    where?: AdminLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminLogs to fetch.
     */
    orderBy?: AdminLogOrderByWithRelationInput | AdminLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminLogs.
     */
    cursor?: AdminLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminLogs.
     */
    distinct?: AdminLogScalarFieldEnum | AdminLogScalarFieldEnum[]
  }

  /**
   * AdminLog findMany
   */
  export type AdminLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLog
     */
    select?: AdminLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLog
     */
    omit?: AdminLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLogInclude<ExtArgs> | null
    /**
     * Filter, which AdminLogs to fetch.
     */
    where?: AdminLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminLogs to fetch.
     */
    orderBy?: AdminLogOrderByWithRelationInput | AdminLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminLogs.
     */
    cursor?: AdminLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminLogs.
     */
    distinct?: AdminLogScalarFieldEnum | AdminLogScalarFieldEnum[]
  }

  /**
   * AdminLog create
   */
  export type AdminLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLog
     */
    select?: AdminLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLog
     */
    omit?: AdminLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AdminLog.
     */
    data: XOR<AdminLogCreateInput, AdminLogUncheckedCreateInput>
  }

  /**
   * AdminLog createMany
   */
  export type AdminLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminLogs.
     */
    data: AdminLogCreateManyInput | AdminLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminLog createManyAndReturn
   */
  export type AdminLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLog
     */
    select?: AdminLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLog
     */
    omit?: AdminLogOmit<ExtArgs> | null
    /**
     * The data used to create many AdminLogs.
     */
    data: AdminLogCreateManyInput | AdminLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AdminLog update
   */
  export type AdminLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLog
     */
    select?: AdminLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLog
     */
    omit?: AdminLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AdminLog.
     */
    data: XOR<AdminLogUpdateInput, AdminLogUncheckedUpdateInput>
    /**
     * Choose, which AdminLog to update.
     */
    where: AdminLogWhereUniqueInput
  }

  /**
   * AdminLog updateMany
   */
  export type AdminLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminLogs.
     */
    data: XOR<AdminLogUpdateManyMutationInput, AdminLogUncheckedUpdateManyInput>
    /**
     * Filter which AdminLogs to update
     */
    where?: AdminLogWhereInput
    /**
     * Limit how many AdminLogs to update.
     */
    limit?: number
  }

  /**
   * AdminLog updateManyAndReturn
   */
  export type AdminLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLog
     */
    select?: AdminLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLog
     */
    omit?: AdminLogOmit<ExtArgs> | null
    /**
     * The data used to update AdminLogs.
     */
    data: XOR<AdminLogUpdateManyMutationInput, AdminLogUncheckedUpdateManyInput>
    /**
     * Filter which AdminLogs to update
     */
    where?: AdminLogWhereInput
    /**
     * Limit how many AdminLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AdminLog upsert
   */
  export type AdminLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLog
     */
    select?: AdminLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLog
     */
    omit?: AdminLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AdminLog to update in case it exists.
     */
    where: AdminLogWhereUniqueInput
    /**
     * In case the AdminLog found by the `where` argument doesn't exist, create a new AdminLog with this data.
     */
    create: XOR<AdminLogCreateInput, AdminLogUncheckedCreateInput>
    /**
     * In case the AdminLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminLogUpdateInput, AdminLogUncheckedUpdateInput>
  }

  /**
   * AdminLog delete
   */
  export type AdminLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLog
     */
    select?: AdminLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLog
     */
    omit?: AdminLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLogInclude<ExtArgs> | null
    /**
     * Filter which AdminLog to delete.
     */
    where: AdminLogWhereUniqueInput
  }

  /**
   * AdminLog deleteMany
   */
  export type AdminLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminLogs to delete
     */
    where?: AdminLogWhereInput
    /**
     * Limit how many AdminLogs to delete.
     */
    limit?: number
  }

  /**
   * AdminLog.user
   */
  export type AdminLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AdminLog without action
   */
  export type AdminLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLog
     */
    select?: AdminLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLog
     */
    omit?: AdminLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLogInclude<ExtArgs> | null
  }


  /**
   * Model ParserLog
   */

  export type AggregateParserLog = {
    _count: ParserLogCountAggregateOutputType | null
    _avg: ParserLogAvgAggregateOutputType | null
    _sum: ParserLogSumAggregateOutputType | null
    _min: ParserLogMinAggregateOutputType | null
    _max: ParserLogMaxAggregateOutputType | null
  }

  export type ParserLogAvgAggregateOutputType = {
    id: number | null
    searchId: number | null
    foundCount: number | null
    duration: number | null
  }

  export type ParserLogSumAggregateOutputType = {
    id: number | null
    searchId: number | null
    foundCount: number | null
    duration: number | null
  }

  export type ParserLogMinAggregateOutputType = {
    id: number | null
    searchId: number | null
    platform: $Enums.Platform | null
    success: boolean | null
    foundCount: number | null
    error: string | null
    duration: number | null
    createdAt: Date | null
  }

  export type ParserLogMaxAggregateOutputType = {
    id: number | null
    searchId: number | null
    platform: $Enums.Platform | null
    success: boolean | null
    foundCount: number | null
    error: string | null
    duration: number | null
    createdAt: Date | null
  }

  export type ParserLogCountAggregateOutputType = {
    id: number
    searchId: number
    platform: number
    success: number
    foundCount: number
    error: number
    duration: number
    createdAt: number
    _all: number
  }


  export type ParserLogAvgAggregateInputType = {
    id?: true
    searchId?: true
    foundCount?: true
    duration?: true
  }

  export type ParserLogSumAggregateInputType = {
    id?: true
    searchId?: true
    foundCount?: true
    duration?: true
  }

  export type ParserLogMinAggregateInputType = {
    id?: true
    searchId?: true
    platform?: true
    success?: true
    foundCount?: true
    error?: true
    duration?: true
    createdAt?: true
  }

  export type ParserLogMaxAggregateInputType = {
    id?: true
    searchId?: true
    platform?: true
    success?: true
    foundCount?: true
    error?: true
    duration?: true
    createdAt?: true
  }

  export type ParserLogCountAggregateInputType = {
    id?: true
    searchId?: true
    platform?: true
    success?: true
    foundCount?: true
    error?: true
    duration?: true
    createdAt?: true
    _all?: true
  }

  export type ParserLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParserLog to aggregate.
     */
    where?: ParserLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParserLogs to fetch.
     */
    orderBy?: ParserLogOrderByWithRelationInput | ParserLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ParserLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParserLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParserLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ParserLogs
    **/
    _count?: true | ParserLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ParserLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ParserLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParserLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParserLogMaxAggregateInputType
  }

  export type GetParserLogAggregateType<T extends ParserLogAggregateArgs> = {
        [P in keyof T & keyof AggregateParserLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParserLog[P]>
      : GetScalarType<T[P], AggregateParserLog[P]>
  }




  export type ParserLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParserLogWhereInput
    orderBy?: ParserLogOrderByWithAggregationInput | ParserLogOrderByWithAggregationInput[]
    by: ParserLogScalarFieldEnum[] | ParserLogScalarFieldEnum
    having?: ParserLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParserLogCountAggregateInputType | true
    _avg?: ParserLogAvgAggregateInputType
    _sum?: ParserLogSumAggregateInputType
    _min?: ParserLogMinAggregateInputType
    _max?: ParserLogMaxAggregateInputType
  }

  export type ParserLogGroupByOutputType = {
    id: number
    searchId: number
    platform: $Enums.Platform
    success: boolean
    foundCount: number
    error: string | null
    duration: number | null
    createdAt: Date
    _count: ParserLogCountAggregateOutputType | null
    _avg: ParserLogAvgAggregateOutputType | null
    _sum: ParserLogSumAggregateOutputType | null
    _min: ParserLogMinAggregateOutputType | null
    _max: ParserLogMaxAggregateOutputType | null
  }

  type GetParserLogGroupByPayload<T extends ParserLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParserLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParserLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParserLogGroupByOutputType[P]>
            : GetScalarType<T[P], ParserLogGroupByOutputType[P]>
        }
      >
    >


  export type ParserLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    searchId?: boolean
    platform?: boolean
    success?: boolean
    foundCount?: boolean
    error?: boolean
    duration?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["parserLog"]>

  export type ParserLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    searchId?: boolean
    platform?: boolean
    success?: boolean
    foundCount?: boolean
    error?: boolean
    duration?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["parserLog"]>

  export type ParserLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    searchId?: boolean
    platform?: boolean
    success?: boolean
    foundCount?: boolean
    error?: boolean
    duration?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["parserLog"]>

  export type ParserLogSelectScalar = {
    id?: boolean
    searchId?: boolean
    platform?: boolean
    success?: boolean
    foundCount?: boolean
    error?: boolean
    duration?: boolean
    createdAt?: boolean
  }

  export type ParserLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "searchId" | "platform" | "success" | "foundCount" | "error" | "duration" | "createdAt", ExtArgs["result"]["parserLog"]>

  export type $ParserLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ParserLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      searchId: number
      platform: $Enums.Platform
      success: boolean
      foundCount: number
      error: string | null
      duration: number | null
      createdAt: Date
    }, ExtArgs["result"]["parserLog"]>
    composites: {}
  }

  type ParserLogGetPayload<S extends boolean | null | undefined | ParserLogDefaultArgs> = $Result.GetResult<Prisma.$ParserLogPayload, S>

  type ParserLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ParserLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ParserLogCountAggregateInputType | true
    }

  export interface ParserLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ParserLog'], meta: { name: 'ParserLog' } }
    /**
     * Find zero or one ParserLog that matches the filter.
     * @param {ParserLogFindUniqueArgs} args - Arguments to find a ParserLog
     * @example
     * // Get one ParserLog
     * const parserLog = await prisma.parserLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParserLogFindUniqueArgs>(args: SelectSubset<T, ParserLogFindUniqueArgs<ExtArgs>>): Prisma__ParserLogClient<$Result.GetResult<Prisma.$ParserLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ParserLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ParserLogFindUniqueOrThrowArgs} args - Arguments to find a ParserLog
     * @example
     * // Get one ParserLog
     * const parserLog = await prisma.parserLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParserLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ParserLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ParserLogClient<$Result.GetResult<Prisma.$ParserLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ParserLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParserLogFindFirstArgs} args - Arguments to find a ParserLog
     * @example
     * // Get one ParserLog
     * const parserLog = await prisma.parserLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParserLogFindFirstArgs>(args?: SelectSubset<T, ParserLogFindFirstArgs<ExtArgs>>): Prisma__ParserLogClient<$Result.GetResult<Prisma.$ParserLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ParserLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParserLogFindFirstOrThrowArgs} args - Arguments to find a ParserLog
     * @example
     * // Get one ParserLog
     * const parserLog = await prisma.parserLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParserLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ParserLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ParserLogClient<$Result.GetResult<Prisma.$ParserLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ParserLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParserLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ParserLogs
     * const parserLogs = await prisma.parserLog.findMany()
     * 
     * // Get first 10 ParserLogs
     * const parserLogs = await prisma.parserLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const parserLogWithIdOnly = await prisma.parserLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ParserLogFindManyArgs>(args?: SelectSubset<T, ParserLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParserLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ParserLog.
     * @param {ParserLogCreateArgs} args - Arguments to create a ParserLog.
     * @example
     * // Create one ParserLog
     * const ParserLog = await prisma.parserLog.create({
     *   data: {
     *     // ... data to create a ParserLog
     *   }
     * })
     * 
     */
    create<T extends ParserLogCreateArgs>(args: SelectSubset<T, ParserLogCreateArgs<ExtArgs>>): Prisma__ParserLogClient<$Result.GetResult<Prisma.$ParserLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ParserLogs.
     * @param {ParserLogCreateManyArgs} args - Arguments to create many ParserLogs.
     * @example
     * // Create many ParserLogs
     * const parserLog = await prisma.parserLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ParserLogCreateManyArgs>(args?: SelectSubset<T, ParserLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ParserLogs and returns the data saved in the database.
     * @param {ParserLogCreateManyAndReturnArgs} args - Arguments to create many ParserLogs.
     * @example
     * // Create many ParserLogs
     * const parserLog = await prisma.parserLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ParserLogs and only return the `id`
     * const parserLogWithIdOnly = await prisma.parserLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ParserLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ParserLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParserLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ParserLog.
     * @param {ParserLogDeleteArgs} args - Arguments to delete one ParserLog.
     * @example
     * // Delete one ParserLog
     * const ParserLog = await prisma.parserLog.delete({
     *   where: {
     *     // ... filter to delete one ParserLog
     *   }
     * })
     * 
     */
    delete<T extends ParserLogDeleteArgs>(args: SelectSubset<T, ParserLogDeleteArgs<ExtArgs>>): Prisma__ParserLogClient<$Result.GetResult<Prisma.$ParserLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ParserLog.
     * @param {ParserLogUpdateArgs} args - Arguments to update one ParserLog.
     * @example
     * // Update one ParserLog
     * const parserLog = await prisma.parserLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ParserLogUpdateArgs>(args: SelectSubset<T, ParserLogUpdateArgs<ExtArgs>>): Prisma__ParserLogClient<$Result.GetResult<Prisma.$ParserLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ParserLogs.
     * @param {ParserLogDeleteManyArgs} args - Arguments to filter ParserLogs to delete.
     * @example
     * // Delete a few ParserLogs
     * const { count } = await prisma.parserLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ParserLogDeleteManyArgs>(args?: SelectSubset<T, ParserLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ParserLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParserLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ParserLogs
     * const parserLog = await prisma.parserLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ParserLogUpdateManyArgs>(args: SelectSubset<T, ParserLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ParserLogs and returns the data updated in the database.
     * @param {ParserLogUpdateManyAndReturnArgs} args - Arguments to update many ParserLogs.
     * @example
     * // Update many ParserLogs
     * const parserLog = await prisma.parserLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ParserLogs and only return the `id`
     * const parserLogWithIdOnly = await prisma.parserLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ParserLogUpdateManyAndReturnArgs>(args: SelectSubset<T, ParserLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParserLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ParserLog.
     * @param {ParserLogUpsertArgs} args - Arguments to update or create a ParserLog.
     * @example
     * // Update or create a ParserLog
     * const parserLog = await prisma.parserLog.upsert({
     *   create: {
     *     // ... data to create a ParserLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ParserLog we want to update
     *   }
     * })
     */
    upsert<T extends ParserLogUpsertArgs>(args: SelectSubset<T, ParserLogUpsertArgs<ExtArgs>>): Prisma__ParserLogClient<$Result.GetResult<Prisma.$ParserLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ParserLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParserLogCountArgs} args - Arguments to filter ParserLogs to count.
     * @example
     * // Count the number of ParserLogs
     * const count = await prisma.parserLog.count({
     *   where: {
     *     // ... the filter for the ParserLogs we want to count
     *   }
     * })
    **/
    count<T extends ParserLogCountArgs>(
      args?: Subset<T, ParserLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParserLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ParserLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParserLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ParserLogAggregateArgs>(args: Subset<T, ParserLogAggregateArgs>): Prisma.PrismaPromise<GetParserLogAggregateType<T>>

    /**
     * Group by ParserLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParserLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ParserLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ParserLogGroupByArgs['orderBy'] }
        : { orderBy?: ParserLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ParserLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParserLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ParserLog model
   */
  readonly fields: ParserLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ParserLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ParserLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ParserLog model
   */
  interface ParserLogFieldRefs {
    readonly id: FieldRef<"ParserLog", 'Int'>
    readonly searchId: FieldRef<"ParserLog", 'Int'>
    readonly platform: FieldRef<"ParserLog", 'Platform'>
    readonly success: FieldRef<"ParserLog", 'Boolean'>
    readonly foundCount: FieldRef<"ParserLog", 'Int'>
    readonly error: FieldRef<"ParserLog", 'String'>
    readonly duration: FieldRef<"ParserLog", 'Int'>
    readonly createdAt: FieldRef<"ParserLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ParserLog findUnique
   */
  export type ParserLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParserLog
     */
    select?: ParserLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParserLog
     */
    omit?: ParserLogOmit<ExtArgs> | null
    /**
     * Filter, which ParserLog to fetch.
     */
    where: ParserLogWhereUniqueInput
  }

  /**
   * ParserLog findUniqueOrThrow
   */
  export type ParserLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParserLog
     */
    select?: ParserLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParserLog
     */
    omit?: ParserLogOmit<ExtArgs> | null
    /**
     * Filter, which ParserLog to fetch.
     */
    where: ParserLogWhereUniqueInput
  }

  /**
   * ParserLog findFirst
   */
  export type ParserLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParserLog
     */
    select?: ParserLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParserLog
     */
    omit?: ParserLogOmit<ExtArgs> | null
    /**
     * Filter, which ParserLog to fetch.
     */
    where?: ParserLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParserLogs to fetch.
     */
    orderBy?: ParserLogOrderByWithRelationInput | ParserLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParserLogs.
     */
    cursor?: ParserLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParserLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParserLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParserLogs.
     */
    distinct?: ParserLogScalarFieldEnum | ParserLogScalarFieldEnum[]
  }

  /**
   * ParserLog findFirstOrThrow
   */
  export type ParserLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParserLog
     */
    select?: ParserLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParserLog
     */
    omit?: ParserLogOmit<ExtArgs> | null
    /**
     * Filter, which ParserLog to fetch.
     */
    where?: ParserLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParserLogs to fetch.
     */
    orderBy?: ParserLogOrderByWithRelationInput | ParserLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParserLogs.
     */
    cursor?: ParserLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParserLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParserLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParserLogs.
     */
    distinct?: ParserLogScalarFieldEnum | ParserLogScalarFieldEnum[]
  }

  /**
   * ParserLog findMany
   */
  export type ParserLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParserLog
     */
    select?: ParserLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParserLog
     */
    omit?: ParserLogOmit<ExtArgs> | null
    /**
     * Filter, which ParserLogs to fetch.
     */
    where?: ParserLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParserLogs to fetch.
     */
    orderBy?: ParserLogOrderByWithRelationInput | ParserLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ParserLogs.
     */
    cursor?: ParserLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParserLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParserLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParserLogs.
     */
    distinct?: ParserLogScalarFieldEnum | ParserLogScalarFieldEnum[]
  }

  /**
   * ParserLog create
   */
  export type ParserLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParserLog
     */
    select?: ParserLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParserLog
     */
    omit?: ParserLogOmit<ExtArgs> | null
    /**
     * The data needed to create a ParserLog.
     */
    data: XOR<ParserLogCreateInput, ParserLogUncheckedCreateInput>
  }

  /**
   * ParserLog createMany
   */
  export type ParserLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ParserLogs.
     */
    data: ParserLogCreateManyInput | ParserLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ParserLog createManyAndReturn
   */
  export type ParserLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParserLog
     */
    select?: ParserLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ParserLog
     */
    omit?: ParserLogOmit<ExtArgs> | null
    /**
     * The data used to create many ParserLogs.
     */
    data: ParserLogCreateManyInput | ParserLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ParserLog update
   */
  export type ParserLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParserLog
     */
    select?: ParserLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParserLog
     */
    omit?: ParserLogOmit<ExtArgs> | null
    /**
     * The data needed to update a ParserLog.
     */
    data: XOR<ParserLogUpdateInput, ParserLogUncheckedUpdateInput>
    /**
     * Choose, which ParserLog to update.
     */
    where: ParserLogWhereUniqueInput
  }

  /**
   * ParserLog updateMany
   */
  export type ParserLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ParserLogs.
     */
    data: XOR<ParserLogUpdateManyMutationInput, ParserLogUncheckedUpdateManyInput>
    /**
     * Filter which ParserLogs to update
     */
    where?: ParserLogWhereInput
    /**
     * Limit how many ParserLogs to update.
     */
    limit?: number
  }

  /**
   * ParserLog updateManyAndReturn
   */
  export type ParserLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParserLog
     */
    select?: ParserLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ParserLog
     */
    omit?: ParserLogOmit<ExtArgs> | null
    /**
     * The data used to update ParserLogs.
     */
    data: XOR<ParserLogUpdateManyMutationInput, ParserLogUncheckedUpdateManyInput>
    /**
     * Filter which ParserLogs to update
     */
    where?: ParserLogWhereInput
    /**
     * Limit how many ParserLogs to update.
     */
    limit?: number
  }

  /**
   * ParserLog upsert
   */
  export type ParserLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParserLog
     */
    select?: ParserLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParserLog
     */
    omit?: ParserLogOmit<ExtArgs> | null
    /**
     * The filter to search for the ParserLog to update in case it exists.
     */
    where: ParserLogWhereUniqueInput
    /**
     * In case the ParserLog found by the `where` argument doesn't exist, create a new ParserLog with this data.
     */
    create: XOR<ParserLogCreateInput, ParserLogUncheckedCreateInput>
    /**
     * In case the ParserLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ParserLogUpdateInput, ParserLogUncheckedUpdateInput>
  }

  /**
   * ParserLog delete
   */
  export type ParserLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParserLog
     */
    select?: ParserLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParserLog
     */
    omit?: ParserLogOmit<ExtArgs> | null
    /**
     * Filter which ParserLog to delete.
     */
    where: ParserLogWhereUniqueInput
  }

  /**
   * ParserLog deleteMany
   */
  export type ParserLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParserLogs to delete
     */
    where?: ParserLogWhereInput
    /**
     * Limit how many ParserLogs to delete.
     */
    limit?: number
  }

  /**
   * ParserLog without action
   */
  export type ParserLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParserLog
     */
    select?: ParserLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParserLog
     */
    omit?: ParserLogOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    telegramId: 'telegramId',
    username: 'username',
    firstName: 'firstName',
    lastName: 'lastName',
    plan: 'plan',
    subscriptionUntil: 'subscriptionUntil',
    isBanned: 'isBanned',
    banReason: 'banReason',
    dailyNotificationCount: 'dailyNotificationCount',
    dailyNotificationLimitResetAt: 'dailyNotificationLimitResetAt',
    limitNotifiedAt: 'limitNotifiedAt',
    trialStartedAt: 'trialStartedAt',
    trialEndsAt: 'trialEndsAt',
    trialUsed: 'trialUsed',
    referredByUserId: 'referredByUserId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastActiveAt: 'lastActiveAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SearchScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    platform: 'platform',
    url: 'url',
    status: 'status',
    isActive: 'isActive',
    errorCount: 'errorCount',
    lastError: 'lastError',
    lastCheckedAt: 'lastCheckedAt',
    lastFoundAt: 'lastFoundAt',
    baselineInitializedAt: 'baselineInitializedAt',
    lastNewListingAt: 'lastNewListingAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SearchScalarFieldEnum = (typeof SearchScalarFieldEnum)[keyof typeof SearchScalarFieldEnum]


  export const ListingScalarFieldEnum: {
    id: 'id',
    searchId: 'searchId',
    externalId: 'externalId',
    title: 'title',
    price: 'price',
    location: 'location',
    imageUrl: 'imageUrl',
    url: 'url',
    platform: 'platform',
    publishedAt: 'publishedAt',
    foundAt: 'foundAt',
    firstSeenAt: 'firstSeenAt',
    isBaseline: 'isBaseline',
    notifiedAt: 'notifiedAt'
  };

  export type ListingScalarFieldEnum = (typeof ListingScalarFieldEnum)[keyof typeof ListingScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    telegramPaymentChargeId: 'telegramPaymentChargeId',
    plan: 'plan',
    days: 'days',
    stars: 'stars',
    status: 'status',
    createdAt: 'createdAt',
    completedAt: 'completedAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const FavoriteScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    listingId: 'listingId',
    createdAt: 'createdAt'
  };

  export type FavoriteScalarFieldEnum = (typeof FavoriteScalarFieldEnum)[keyof typeof FavoriteScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    searchId: 'searchId',
    listingId: 'listingId',
    status: 'status',
    sentAt: 'sentAt',
    failReason: 'failReason',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const UserSettingsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    silentMode: 'silentMode',
    photoMode: 'photoMode',
    digestMode: 'digestMode',
    workingHoursEnabled: 'workingHoursEnabled',
    workingHoursFrom: 'workingHoursFrom',
    workingHoursTo: 'workingHoursTo',
    timezone: 'timezone',
    language: 'language',
    updatedAt: 'updatedAt'
  };

  export type UserSettingsScalarFieldEnum = (typeof UserSettingsScalarFieldEnum)[keyof typeof UserSettingsScalarFieldEnum]


  export const PromoCodeScalarFieldEnum: {
    id: 'id',
    code: 'code',
    plan: 'plan',
    days: 'days',
    maxUses: 'maxUses',
    usedCount: 'usedCount',
    expiresAt: 'expiresAt',
    isActive: 'isActive',
    createdAt: 'createdAt'
  };

  export type PromoCodeScalarFieldEnum = (typeof PromoCodeScalarFieldEnum)[keyof typeof PromoCodeScalarFieldEnum]


  export const PromoCodeUseScalarFieldEnum: {
    id: 'id',
    promoCodeId: 'promoCodeId',
    userId: 'userId',
    usedAt: 'usedAt'
  };

  export type PromoCodeUseScalarFieldEnum = (typeof PromoCodeUseScalarFieldEnum)[keyof typeof PromoCodeUseScalarFieldEnum]


  export const ReferralScalarFieldEnum: {
    id: 'id',
    referrerId: 'referrerId',
    referredId: 'referredId',
    bonusDays: 'bonusDays',
    createdAt: 'createdAt'
  };

  export type ReferralScalarFieldEnum = (typeof ReferralScalarFieldEnum)[keyof typeof ReferralScalarFieldEnum]


  export const AdminLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    action: 'action',
    details: 'details',
    createdAt: 'createdAt'
  };

  export type AdminLogScalarFieldEnum = (typeof AdminLogScalarFieldEnum)[keyof typeof AdminLogScalarFieldEnum]


  export const ParserLogScalarFieldEnum: {
    id: 'id',
    searchId: 'searchId',
    platform: 'platform',
    success: 'success',
    foundCount: 'foundCount',
    error: 'error',
    duration: 'duration',
    createdAt: 'createdAt'
  };

  export type ParserLogScalarFieldEnum = (typeof ParserLogScalarFieldEnum)[keyof typeof ParserLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Plan'
   */
  export type EnumPlanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Plan'>
    


  /**
   * Reference to a field of type 'Plan[]'
   */
  export type ListEnumPlanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Plan[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Platform'
   */
  export type EnumPlatformFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Platform'>
    


  /**
   * Reference to a field of type 'Platform[]'
   */
  export type ListEnumPlatformFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Platform[]'>
    


  /**
   * Reference to a field of type 'SearchStatus'
   */
  export type EnumSearchStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SearchStatus'>
    


  /**
   * Reference to a field of type 'SearchStatus[]'
   */
  export type ListEnumSearchStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SearchStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'NotificationStatus'
   */
  export type EnumNotificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationStatus'>
    


  /**
   * Reference to a field of type 'NotificationStatus[]'
   */
  export type ListEnumNotificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    telegramId?: BigIntFilter<"User"> | bigint | number
    username?: StringNullableFilter<"User"> | string | null
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    plan?: EnumPlanFilter<"User"> | $Enums.Plan
    subscriptionUntil?: DateTimeNullableFilter<"User"> | Date | string | null
    isBanned?: BoolFilter<"User"> | boolean
    banReason?: StringNullableFilter<"User"> | string | null
    dailyNotificationCount?: IntFilter<"User"> | number
    dailyNotificationLimitResetAt?: DateTimeFilter<"User"> | Date | string
    limitNotifiedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    trialStartedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    trialEndsAt?: DateTimeNullableFilter<"User"> | Date | string | null
    trialUsed?: BoolFilter<"User"> | boolean
    referredByUserId?: IntNullableFilter<"User"> | number | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastActiveAt?: DateTimeFilter<"User"> | Date | string
    referredBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    referrals?: UserListRelationFilter
    searches?: SearchListRelationFilter
    payments?: PaymentListRelationFilter
    favorites?: FavoriteListRelationFilter
    notifications?: NotificationListRelationFilter
    settings?: XOR<UserSettingsNullableScalarRelationFilter, UserSettingsWhereInput> | null
    adminLogs?: AdminLogListRelationFilter
    sentReferrals?: ReferralListRelationFilter
    gotReferral?: XOR<ReferralNullableScalarRelationFilter, ReferralWhereInput> | null
    promoUses?: PromoCodeUseListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    plan?: SortOrder
    subscriptionUntil?: SortOrderInput | SortOrder
    isBanned?: SortOrder
    banReason?: SortOrderInput | SortOrder
    dailyNotificationCount?: SortOrder
    dailyNotificationLimitResetAt?: SortOrder
    limitNotifiedAt?: SortOrderInput | SortOrder
    trialStartedAt?: SortOrderInput | SortOrder
    trialEndsAt?: SortOrderInput | SortOrder
    trialUsed?: SortOrder
    referredByUserId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastActiveAt?: SortOrder
    referredBy?: UserOrderByWithRelationInput
    referrals?: UserOrderByRelationAggregateInput
    searches?: SearchOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
    favorites?: FavoriteOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    settings?: UserSettingsOrderByWithRelationInput
    adminLogs?: AdminLogOrderByRelationAggregateInput
    sentReferrals?: ReferralOrderByRelationAggregateInput
    gotReferral?: ReferralOrderByWithRelationInput
    promoUses?: PromoCodeUseOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    telegramId?: bigint | number
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    username?: StringNullableFilter<"User"> | string | null
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    plan?: EnumPlanFilter<"User"> | $Enums.Plan
    subscriptionUntil?: DateTimeNullableFilter<"User"> | Date | string | null
    isBanned?: BoolFilter<"User"> | boolean
    banReason?: StringNullableFilter<"User"> | string | null
    dailyNotificationCount?: IntFilter<"User"> | number
    dailyNotificationLimitResetAt?: DateTimeFilter<"User"> | Date | string
    limitNotifiedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    trialStartedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    trialEndsAt?: DateTimeNullableFilter<"User"> | Date | string | null
    trialUsed?: BoolFilter<"User"> | boolean
    referredByUserId?: IntNullableFilter<"User"> | number | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastActiveAt?: DateTimeFilter<"User"> | Date | string
    referredBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    referrals?: UserListRelationFilter
    searches?: SearchListRelationFilter
    payments?: PaymentListRelationFilter
    favorites?: FavoriteListRelationFilter
    notifications?: NotificationListRelationFilter
    settings?: XOR<UserSettingsNullableScalarRelationFilter, UserSettingsWhereInput> | null
    adminLogs?: AdminLogListRelationFilter
    sentReferrals?: ReferralListRelationFilter
    gotReferral?: XOR<ReferralNullableScalarRelationFilter, ReferralWhereInput> | null
    promoUses?: PromoCodeUseListRelationFilter
  }, "id" | "telegramId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    plan?: SortOrder
    subscriptionUntil?: SortOrderInput | SortOrder
    isBanned?: SortOrder
    banReason?: SortOrderInput | SortOrder
    dailyNotificationCount?: SortOrder
    dailyNotificationLimitResetAt?: SortOrder
    limitNotifiedAt?: SortOrderInput | SortOrder
    trialStartedAt?: SortOrderInput | SortOrder
    trialEndsAt?: SortOrderInput | SortOrder
    trialUsed?: SortOrder
    referredByUserId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastActiveAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    telegramId?: BigIntWithAggregatesFilter<"User"> | bigint | number
    username?: StringNullableWithAggregatesFilter<"User"> | string | null
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    plan?: EnumPlanWithAggregatesFilter<"User"> | $Enums.Plan
    subscriptionUntil?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    isBanned?: BoolWithAggregatesFilter<"User"> | boolean
    banReason?: StringNullableWithAggregatesFilter<"User"> | string | null
    dailyNotificationCount?: IntWithAggregatesFilter<"User"> | number
    dailyNotificationLimitResetAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    limitNotifiedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    trialStartedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    trialEndsAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    trialUsed?: BoolWithAggregatesFilter<"User"> | boolean
    referredByUserId?: IntNullableWithAggregatesFilter<"User"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    lastActiveAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SearchWhereInput = {
    AND?: SearchWhereInput | SearchWhereInput[]
    OR?: SearchWhereInput[]
    NOT?: SearchWhereInput | SearchWhereInput[]
    id?: IntFilter<"Search"> | number
    userId?: IntFilter<"Search"> | number
    name?: StringNullableFilter<"Search"> | string | null
    platform?: EnumPlatformFilter<"Search"> | $Enums.Platform
    url?: StringFilter<"Search"> | string
    status?: EnumSearchStatusFilter<"Search"> | $Enums.SearchStatus
    isActive?: BoolFilter<"Search"> | boolean
    errorCount?: IntFilter<"Search"> | number
    lastError?: StringNullableFilter<"Search"> | string | null
    lastCheckedAt?: DateTimeNullableFilter<"Search"> | Date | string | null
    lastFoundAt?: DateTimeNullableFilter<"Search"> | Date | string | null
    baselineInitializedAt?: DateTimeNullableFilter<"Search"> | Date | string | null
    lastNewListingAt?: DateTimeNullableFilter<"Search"> | Date | string | null
    createdAt?: DateTimeFilter<"Search"> | Date | string
    updatedAt?: DateTimeFilter<"Search"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    listings?: ListingListRelationFilter
    notifications?: NotificationListRelationFilter
  }

  export type SearchOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrderInput | SortOrder
    platform?: SortOrder
    url?: SortOrder
    status?: SortOrder
    isActive?: SortOrder
    errorCount?: SortOrder
    lastError?: SortOrderInput | SortOrder
    lastCheckedAt?: SortOrderInput | SortOrder
    lastFoundAt?: SortOrderInput | SortOrder
    baselineInitializedAt?: SortOrderInput | SortOrder
    lastNewListingAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    listings?: ListingOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
  }

  export type SearchWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SearchWhereInput | SearchWhereInput[]
    OR?: SearchWhereInput[]
    NOT?: SearchWhereInput | SearchWhereInput[]
    userId?: IntFilter<"Search"> | number
    name?: StringNullableFilter<"Search"> | string | null
    platform?: EnumPlatformFilter<"Search"> | $Enums.Platform
    url?: StringFilter<"Search"> | string
    status?: EnumSearchStatusFilter<"Search"> | $Enums.SearchStatus
    isActive?: BoolFilter<"Search"> | boolean
    errorCount?: IntFilter<"Search"> | number
    lastError?: StringNullableFilter<"Search"> | string | null
    lastCheckedAt?: DateTimeNullableFilter<"Search"> | Date | string | null
    lastFoundAt?: DateTimeNullableFilter<"Search"> | Date | string | null
    baselineInitializedAt?: DateTimeNullableFilter<"Search"> | Date | string | null
    lastNewListingAt?: DateTimeNullableFilter<"Search"> | Date | string | null
    createdAt?: DateTimeFilter<"Search"> | Date | string
    updatedAt?: DateTimeFilter<"Search"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    listings?: ListingListRelationFilter
    notifications?: NotificationListRelationFilter
  }, "id">

  export type SearchOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrderInput | SortOrder
    platform?: SortOrder
    url?: SortOrder
    status?: SortOrder
    isActive?: SortOrder
    errorCount?: SortOrder
    lastError?: SortOrderInput | SortOrder
    lastCheckedAt?: SortOrderInput | SortOrder
    lastFoundAt?: SortOrderInput | SortOrder
    baselineInitializedAt?: SortOrderInput | SortOrder
    lastNewListingAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SearchCountOrderByAggregateInput
    _avg?: SearchAvgOrderByAggregateInput
    _max?: SearchMaxOrderByAggregateInput
    _min?: SearchMinOrderByAggregateInput
    _sum?: SearchSumOrderByAggregateInput
  }

  export type SearchScalarWhereWithAggregatesInput = {
    AND?: SearchScalarWhereWithAggregatesInput | SearchScalarWhereWithAggregatesInput[]
    OR?: SearchScalarWhereWithAggregatesInput[]
    NOT?: SearchScalarWhereWithAggregatesInput | SearchScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Search"> | number
    userId?: IntWithAggregatesFilter<"Search"> | number
    name?: StringNullableWithAggregatesFilter<"Search"> | string | null
    platform?: EnumPlatformWithAggregatesFilter<"Search"> | $Enums.Platform
    url?: StringWithAggregatesFilter<"Search"> | string
    status?: EnumSearchStatusWithAggregatesFilter<"Search"> | $Enums.SearchStatus
    isActive?: BoolWithAggregatesFilter<"Search"> | boolean
    errorCount?: IntWithAggregatesFilter<"Search"> | number
    lastError?: StringNullableWithAggregatesFilter<"Search"> | string | null
    lastCheckedAt?: DateTimeNullableWithAggregatesFilter<"Search"> | Date | string | null
    lastFoundAt?: DateTimeNullableWithAggregatesFilter<"Search"> | Date | string | null
    baselineInitializedAt?: DateTimeNullableWithAggregatesFilter<"Search"> | Date | string | null
    lastNewListingAt?: DateTimeNullableWithAggregatesFilter<"Search"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Search"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Search"> | Date | string
  }

  export type ListingWhereInput = {
    AND?: ListingWhereInput | ListingWhereInput[]
    OR?: ListingWhereInput[]
    NOT?: ListingWhereInput | ListingWhereInput[]
    id?: IntFilter<"Listing"> | number
    searchId?: IntFilter<"Listing"> | number
    externalId?: StringFilter<"Listing"> | string
    title?: StringFilter<"Listing"> | string
    price?: StringNullableFilter<"Listing"> | string | null
    location?: StringNullableFilter<"Listing"> | string | null
    imageUrl?: StringNullableFilter<"Listing"> | string | null
    url?: StringFilter<"Listing"> | string
    platform?: EnumPlatformFilter<"Listing"> | $Enums.Platform
    publishedAt?: DateTimeNullableFilter<"Listing"> | Date | string | null
    foundAt?: DateTimeFilter<"Listing"> | Date | string
    firstSeenAt?: DateTimeFilter<"Listing"> | Date | string
    isBaseline?: BoolFilter<"Listing"> | boolean
    notifiedAt?: DateTimeNullableFilter<"Listing"> | Date | string | null
    search?: XOR<SearchScalarRelationFilter, SearchWhereInput>
    notifications?: NotificationListRelationFilter
    favorites?: FavoriteListRelationFilter
  }

  export type ListingOrderByWithRelationInput = {
    id?: SortOrder
    searchId?: SortOrder
    externalId?: SortOrder
    title?: SortOrder
    price?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    url?: SortOrder
    platform?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    foundAt?: SortOrder
    firstSeenAt?: SortOrder
    isBaseline?: SortOrder
    notifiedAt?: SortOrderInput | SortOrder
    search?: SearchOrderByWithRelationInput
    notifications?: NotificationOrderByRelationAggregateInput
    favorites?: FavoriteOrderByRelationAggregateInput
  }

  export type ListingWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    searchId_externalId?: ListingSearchIdExternalIdCompoundUniqueInput
    AND?: ListingWhereInput | ListingWhereInput[]
    OR?: ListingWhereInput[]
    NOT?: ListingWhereInput | ListingWhereInput[]
    searchId?: IntFilter<"Listing"> | number
    externalId?: StringFilter<"Listing"> | string
    title?: StringFilter<"Listing"> | string
    price?: StringNullableFilter<"Listing"> | string | null
    location?: StringNullableFilter<"Listing"> | string | null
    imageUrl?: StringNullableFilter<"Listing"> | string | null
    url?: StringFilter<"Listing"> | string
    platform?: EnumPlatformFilter<"Listing"> | $Enums.Platform
    publishedAt?: DateTimeNullableFilter<"Listing"> | Date | string | null
    foundAt?: DateTimeFilter<"Listing"> | Date | string
    firstSeenAt?: DateTimeFilter<"Listing"> | Date | string
    isBaseline?: BoolFilter<"Listing"> | boolean
    notifiedAt?: DateTimeNullableFilter<"Listing"> | Date | string | null
    search?: XOR<SearchScalarRelationFilter, SearchWhereInput>
    notifications?: NotificationListRelationFilter
    favorites?: FavoriteListRelationFilter
  }, "id" | "searchId_externalId">

  export type ListingOrderByWithAggregationInput = {
    id?: SortOrder
    searchId?: SortOrder
    externalId?: SortOrder
    title?: SortOrder
    price?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    url?: SortOrder
    platform?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    foundAt?: SortOrder
    firstSeenAt?: SortOrder
    isBaseline?: SortOrder
    notifiedAt?: SortOrderInput | SortOrder
    _count?: ListingCountOrderByAggregateInput
    _avg?: ListingAvgOrderByAggregateInput
    _max?: ListingMaxOrderByAggregateInput
    _min?: ListingMinOrderByAggregateInput
    _sum?: ListingSumOrderByAggregateInput
  }

  export type ListingScalarWhereWithAggregatesInput = {
    AND?: ListingScalarWhereWithAggregatesInput | ListingScalarWhereWithAggregatesInput[]
    OR?: ListingScalarWhereWithAggregatesInput[]
    NOT?: ListingScalarWhereWithAggregatesInput | ListingScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Listing"> | number
    searchId?: IntWithAggregatesFilter<"Listing"> | number
    externalId?: StringWithAggregatesFilter<"Listing"> | string
    title?: StringWithAggregatesFilter<"Listing"> | string
    price?: StringNullableWithAggregatesFilter<"Listing"> | string | null
    location?: StringNullableWithAggregatesFilter<"Listing"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"Listing"> | string | null
    url?: StringWithAggregatesFilter<"Listing"> | string
    platform?: EnumPlatformWithAggregatesFilter<"Listing"> | $Enums.Platform
    publishedAt?: DateTimeNullableWithAggregatesFilter<"Listing"> | Date | string | null
    foundAt?: DateTimeWithAggregatesFilter<"Listing"> | Date | string
    firstSeenAt?: DateTimeWithAggregatesFilter<"Listing"> | Date | string
    isBaseline?: BoolWithAggregatesFilter<"Listing"> | boolean
    notifiedAt?: DateTimeNullableWithAggregatesFilter<"Listing"> | Date | string | null
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: IntFilter<"Payment"> | number
    userId?: IntFilter<"Payment"> | number
    telegramPaymentChargeId?: StringNullableFilter<"Payment"> | string | null
    plan?: EnumPlanFilter<"Payment"> | $Enums.Plan
    days?: IntFilter<"Payment"> | number
    stars?: IntFilter<"Payment"> | number
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    completedAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    telegramPaymentChargeId?: SortOrderInput | SortOrder
    plan?: SortOrder
    days?: SortOrder
    stars?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    telegramPaymentChargeId?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    userId?: IntFilter<"Payment"> | number
    plan?: EnumPlanFilter<"Payment"> | $Enums.Plan
    days?: IntFilter<"Payment"> | number
    stars?: IntFilter<"Payment"> | number
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    completedAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "telegramPaymentChargeId">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    telegramPaymentChargeId?: SortOrderInput | SortOrder
    plan?: SortOrder
    days?: SortOrder
    stars?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Payment"> | number
    userId?: IntWithAggregatesFilter<"Payment"> | number
    telegramPaymentChargeId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    plan?: EnumPlanWithAggregatesFilter<"Payment"> | $Enums.Plan
    days?: IntWithAggregatesFilter<"Payment"> | number
    stars?: IntWithAggregatesFilter<"Payment"> | number
    status?: EnumPaymentStatusWithAggregatesFilter<"Payment"> | $Enums.PaymentStatus
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null
  }

  export type FavoriteWhereInput = {
    AND?: FavoriteWhereInput | FavoriteWhereInput[]
    OR?: FavoriteWhereInput[]
    NOT?: FavoriteWhereInput | FavoriteWhereInput[]
    id?: IntFilter<"Favorite"> | number
    userId?: IntFilter<"Favorite"> | number
    listingId?: IntFilter<"Favorite"> | number
    createdAt?: DateTimeFilter<"Favorite"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    listing?: XOR<ListingScalarRelationFilter, ListingWhereInput>
  }

  export type FavoriteOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    listing?: ListingOrderByWithRelationInput
  }

  export type FavoriteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_listingId?: FavoriteUserIdListingIdCompoundUniqueInput
    AND?: FavoriteWhereInput | FavoriteWhereInput[]
    OR?: FavoriteWhereInput[]
    NOT?: FavoriteWhereInput | FavoriteWhereInput[]
    userId?: IntFilter<"Favorite"> | number
    listingId?: IntFilter<"Favorite"> | number
    createdAt?: DateTimeFilter<"Favorite"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    listing?: XOR<ListingScalarRelationFilter, ListingWhereInput>
  }, "id" | "userId_listingId">

  export type FavoriteOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
    createdAt?: SortOrder
    _count?: FavoriteCountOrderByAggregateInput
    _avg?: FavoriteAvgOrderByAggregateInput
    _max?: FavoriteMaxOrderByAggregateInput
    _min?: FavoriteMinOrderByAggregateInput
    _sum?: FavoriteSumOrderByAggregateInput
  }

  export type FavoriteScalarWhereWithAggregatesInput = {
    AND?: FavoriteScalarWhereWithAggregatesInput | FavoriteScalarWhereWithAggregatesInput[]
    OR?: FavoriteScalarWhereWithAggregatesInput[]
    NOT?: FavoriteScalarWhereWithAggregatesInput | FavoriteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Favorite"> | number
    userId?: IntWithAggregatesFilter<"Favorite"> | number
    listingId?: IntWithAggregatesFilter<"Favorite"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Favorite"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: IntFilter<"Notification"> | number
    userId?: IntFilter<"Notification"> | number
    searchId?: IntFilter<"Notification"> | number
    listingId?: IntFilter<"Notification"> | number
    status?: EnumNotificationStatusFilter<"Notification"> | $Enums.NotificationStatus
    sentAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
    failReason?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    search?: XOR<SearchScalarRelationFilter, SearchWhereInput>
    listing?: XOR<ListingScalarRelationFilter, ListingWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    searchId?: SortOrder
    listingId?: SortOrder
    status?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    failReason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    search?: SearchOrderByWithRelationInput
    listing?: ListingOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: IntFilter<"Notification"> | number
    searchId?: IntFilter<"Notification"> | number
    listingId?: IntFilter<"Notification"> | number
    status?: EnumNotificationStatusFilter<"Notification"> | $Enums.NotificationStatus
    sentAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
    failReason?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    search?: XOR<SearchScalarRelationFilter, SearchWhereInput>
    listing?: XOR<ListingScalarRelationFilter, ListingWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    searchId?: SortOrder
    listingId?: SortOrder
    status?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    failReason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _avg?: NotificationAvgOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
    _sum?: NotificationSumOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Notification"> | number
    userId?: IntWithAggregatesFilter<"Notification"> | number
    searchId?: IntWithAggregatesFilter<"Notification"> | number
    listingId?: IntWithAggregatesFilter<"Notification"> | number
    status?: EnumNotificationStatusWithAggregatesFilter<"Notification"> | $Enums.NotificationStatus
    sentAt?: DateTimeNullableWithAggregatesFilter<"Notification"> | Date | string | null
    failReason?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type UserSettingsWhereInput = {
    AND?: UserSettingsWhereInput | UserSettingsWhereInput[]
    OR?: UserSettingsWhereInput[]
    NOT?: UserSettingsWhereInput | UserSettingsWhereInput[]
    id?: IntFilter<"UserSettings"> | number
    userId?: IntFilter<"UserSettings"> | number
    silentMode?: BoolFilter<"UserSettings"> | boolean
    photoMode?: BoolFilter<"UserSettings"> | boolean
    digestMode?: BoolFilter<"UserSettings"> | boolean
    workingHoursEnabled?: BoolFilter<"UserSettings"> | boolean
    workingHoursFrom?: IntFilter<"UserSettings"> | number
    workingHoursTo?: IntFilter<"UserSettings"> | number
    timezone?: StringFilter<"UserSettings"> | string
    language?: StringFilter<"UserSettings"> | string
    updatedAt?: DateTimeFilter<"UserSettings"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserSettingsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    silentMode?: SortOrder
    photoMode?: SortOrder
    digestMode?: SortOrder
    workingHoursEnabled?: SortOrder
    workingHoursFrom?: SortOrder
    workingHoursTo?: SortOrder
    timezone?: SortOrder
    language?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    AND?: UserSettingsWhereInput | UserSettingsWhereInput[]
    OR?: UserSettingsWhereInput[]
    NOT?: UserSettingsWhereInput | UserSettingsWhereInput[]
    silentMode?: BoolFilter<"UserSettings"> | boolean
    photoMode?: BoolFilter<"UserSettings"> | boolean
    digestMode?: BoolFilter<"UserSettings"> | boolean
    workingHoursEnabled?: BoolFilter<"UserSettings"> | boolean
    workingHoursFrom?: IntFilter<"UserSettings"> | number
    workingHoursTo?: IntFilter<"UserSettings"> | number
    timezone?: StringFilter<"UserSettings"> | string
    language?: StringFilter<"UserSettings"> | string
    updatedAt?: DateTimeFilter<"UserSettings"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type UserSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    silentMode?: SortOrder
    photoMode?: SortOrder
    digestMode?: SortOrder
    workingHoursEnabled?: SortOrder
    workingHoursFrom?: SortOrder
    workingHoursTo?: SortOrder
    timezone?: SortOrder
    language?: SortOrder
    updatedAt?: SortOrder
    _count?: UserSettingsCountOrderByAggregateInput
    _avg?: UserSettingsAvgOrderByAggregateInput
    _max?: UserSettingsMaxOrderByAggregateInput
    _min?: UserSettingsMinOrderByAggregateInput
    _sum?: UserSettingsSumOrderByAggregateInput
  }

  export type UserSettingsScalarWhereWithAggregatesInput = {
    AND?: UserSettingsScalarWhereWithAggregatesInput | UserSettingsScalarWhereWithAggregatesInput[]
    OR?: UserSettingsScalarWhereWithAggregatesInput[]
    NOT?: UserSettingsScalarWhereWithAggregatesInput | UserSettingsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserSettings"> | number
    userId?: IntWithAggregatesFilter<"UserSettings"> | number
    silentMode?: BoolWithAggregatesFilter<"UserSettings"> | boolean
    photoMode?: BoolWithAggregatesFilter<"UserSettings"> | boolean
    digestMode?: BoolWithAggregatesFilter<"UserSettings"> | boolean
    workingHoursEnabled?: BoolWithAggregatesFilter<"UserSettings"> | boolean
    workingHoursFrom?: IntWithAggregatesFilter<"UserSettings"> | number
    workingHoursTo?: IntWithAggregatesFilter<"UserSettings"> | number
    timezone?: StringWithAggregatesFilter<"UserSettings"> | string
    language?: StringWithAggregatesFilter<"UserSettings"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserSettings"> | Date | string
  }

  export type PromoCodeWhereInput = {
    AND?: PromoCodeWhereInput | PromoCodeWhereInput[]
    OR?: PromoCodeWhereInput[]
    NOT?: PromoCodeWhereInput | PromoCodeWhereInput[]
    id?: IntFilter<"PromoCode"> | number
    code?: StringFilter<"PromoCode"> | string
    plan?: EnumPlanFilter<"PromoCode"> | $Enums.Plan
    days?: IntFilter<"PromoCode"> | number
    maxUses?: IntFilter<"PromoCode"> | number
    usedCount?: IntFilter<"PromoCode"> | number
    expiresAt?: DateTimeNullableFilter<"PromoCode"> | Date | string | null
    isActive?: BoolFilter<"PromoCode"> | boolean
    createdAt?: DateTimeFilter<"PromoCode"> | Date | string
    uses?: PromoCodeUseListRelationFilter
  }

  export type PromoCodeOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    plan?: SortOrder
    days?: SortOrder
    maxUses?: SortOrder
    usedCount?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    uses?: PromoCodeUseOrderByRelationAggregateInput
  }

  export type PromoCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: PromoCodeWhereInput | PromoCodeWhereInput[]
    OR?: PromoCodeWhereInput[]
    NOT?: PromoCodeWhereInput | PromoCodeWhereInput[]
    plan?: EnumPlanFilter<"PromoCode"> | $Enums.Plan
    days?: IntFilter<"PromoCode"> | number
    maxUses?: IntFilter<"PromoCode"> | number
    usedCount?: IntFilter<"PromoCode"> | number
    expiresAt?: DateTimeNullableFilter<"PromoCode"> | Date | string | null
    isActive?: BoolFilter<"PromoCode"> | boolean
    createdAt?: DateTimeFilter<"PromoCode"> | Date | string
    uses?: PromoCodeUseListRelationFilter
  }, "id" | "code">

  export type PromoCodeOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    plan?: SortOrder
    days?: SortOrder
    maxUses?: SortOrder
    usedCount?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    _count?: PromoCodeCountOrderByAggregateInput
    _avg?: PromoCodeAvgOrderByAggregateInput
    _max?: PromoCodeMaxOrderByAggregateInput
    _min?: PromoCodeMinOrderByAggregateInput
    _sum?: PromoCodeSumOrderByAggregateInput
  }

  export type PromoCodeScalarWhereWithAggregatesInput = {
    AND?: PromoCodeScalarWhereWithAggregatesInput | PromoCodeScalarWhereWithAggregatesInput[]
    OR?: PromoCodeScalarWhereWithAggregatesInput[]
    NOT?: PromoCodeScalarWhereWithAggregatesInput | PromoCodeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PromoCode"> | number
    code?: StringWithAggregatesFilter<"PromoCode"> | string
    plan?: EnumPlanWithAggregatesFilter<"PromoCode"> | $Enums.Plan
    days?: IntWithAggregatesFilter<"PromoCode"> | number
    maxUses?: IntWithAggregatesFilter<"PromoCode"> | number
    usedCount?: IntWithAggregatesFilter<"PromoCode"> | number
    expiresAt?: DateTimeNullableWithAggregatesFilter<"PromoCode"> | Date | string | null
    isActive?: BoolWithAggregatesFilter<"PromoCode"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"PromoCode"> | Date | string
  }

  export type PromoCodeUseWhereInput = {
    AND?: PromoCodeUseWhereInput | PromoCodeUseWhereInput[]
    OR?: PromoCodeUseWhereInput[]
    NOT?: PromoCodeUseWhereInput | PromoCodeUseWhereInput[]
    id?: IntFilter<"PromoCodeUse"> | number
    promoCodeId?: IntFilter<"PromoCodeUse"> | number
    userId?: IntFilter<"PromoCodeUse"> | number
    usedAt?: DateTimeFilter<"PromoCodeUse"> | Date | string
    promoCode?: XOR<PromoCodeScalarRelationFilter, PromoCodeWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PromoCodeUseOrderByWithRelationInput = {
    id?: SortOrder
    promoCodeId?: SortOrder
    userId?: SortOrder
    usedAt?: SortOrder
    promoCode?: PromoCodeOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type PromoCodeUseWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    promoCodeId_userId?: PromoCodeUsePromoCodeIdUserIdCompoundUniqueInput
    AND?: PromoCodeUseWhereInput | PromoCodeUseWhereInput[]
    OR?: PromoCodeUseWhereInput[]
    NOT?: PromoCodeUseWhereInput | PromoCodeUseWhereInput[]
    promoCodeId?: IntFilter<"PromoCodeUse"> | number
    userId?: IntFilter<"PromoCodeUse"> | number
    usedAt?: DateTimeFilter<"PromoCodeUse"> | Date | string
    promoCode?: XOR<PromoCodeScalarRelationFilter, PromoCodeWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "promoCodeId_userId">

  export type PromoCodeUseOrderByWithAggregationInput = {
    id?: SortOrder
    promoCodeId?: SortOrder
    userId?: SortOrder
    usedAt?: SortOrder
    _count?: PromoCodeUseCountOrderByAggregateInput
    _avg?: PromoCodeUseAvgOrderByAggregateInput
    _max?: PromoCodeUseMaxOrderByAggregateInput
    _min?: PromoCodeUseMinOrderByAggregateInput
    _sum?: PromoCodeUseSumOrderByAggregateInput
  }

  export type PromoCodeUseScalarWhereWithAggregatesInput = {
    AND?: PromoCodeUseScalarWhereWithAggregatesInput | PromoCodeUseScalarWhereWithAggregatesInput[]
    OR?: PromoCodeUseScalarWhereWithAggregatesInput[]
    NOT?: PromoCodeUseScalarWhereWithAggregatesInput | PromoCodeUseScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PromoCodeUse"> | number
    promoCodeId?: IntWithAggregatesFilter<"PromoCodeUse"> | number
    userId?: IntWithAggregatesFilter<"PromoCodeUse"> | number
    usedAt?: DateTimeWithAggregatesFilter<"PromoCodeUse"> | Date | string
  }

  export type ReferralWhereInput = {
    AND?: ReferralWhereInput | ReferralWhereInput[]
    OR?: ReferralWhereInput[]
    NOT?: ReferralWhereInput | ReferralWhereInput[]
    id?: IntFilter<"Referral"> | number
    referrerId?: IntFilter<"Referral"> | number
    referredId?: IntFilter<"Referral"> | number
    bonusDays?: IntFilter<"Referral"> | number
    createdAt?: DateTimeFilter<"Referral"> | Date | string
    referrer?: XOR<UserScalarRelationFilter, UserWhereInput>
    referred?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ReferralOrderByWithRelationInput = {
    id?: SortOrder
    referrerId?: SortOrder
    referredId?: SortOrder
    bonusDays?: SortOrder
    createdAt?: SortOrder
    referrer?: UserOrderByWithRelationInput
    referred?: UserOrderByWithRelationInput
  }

  export type ReferralWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    referredId?: number
    AND?: ReferralWhereInput | ReferralWhereInput[]
    OR?: ReferralWhereInput[]
    NOT?: ReferralWhereInput | ReferralWhereInput[]
    referrerId?: IntFilter<"Referral"> | number
    bonusDays?: IntFilter<"Referral"> | number
    createdAt?: DateTimeFilter<"Referral"> | Date | string
    referrer?: XOR<UserScalarRelationFilter, UserWhereInput>
    referred?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "referredId">

  export type ReferralOrderByWithAggregationInput = {
    id?: SortOrder
    referrerId?: SortOrder
    referredId?: SortOrder
    bonusDays?: SortOrder
    createdAt?: SortOrder
    _count?: ReferralCountOrderByAggregateInput
    _avg?: ReferralAvgOrderByAggregateInput
    _max?: ReferralMaxOrderByAggregateInput
    _min?: ReferralMinOrderByAggregateInput
    _sum?: ReferralSumOrderByAggregateInput
  }

  export type ReferralScalarWhereWithAggregatesInput = {
    AND?: ReferralScalarWhereWithAggregatesInput | ReferralScalarWhereWithAggregatesInput[]
    OR?: ReferralScalarWhereWithAggregatesInput[]
    NOT?: ReferralScalarWhereWithAggregatesInput | ReferralScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Referral"> | number
    referrerId?: IntWithAggregatesFilter<"Referral"> | number
    referredId?: IntWithAggregatesFilter<"Referral"> | number
    bonusDays?: IntWithAggregatesFilter<"Referral"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Referral"> | Date | string
  }

  export type AdminLogWhereInput = {
    AND?: AdminLogWhereInput | AdminLogWhereInput[]
    OR?: AdminLogWhereInput[]
    NOT?: AdminLogWhereInput | AdminLogWhereInput[]
    id?: IntFilter<"AdminLog"> | number
    userId?: IntNullableFilter<"AdminLog"> | number | null
    action?: StringFilter<"AdminLog"> | string
    details?: StringNullableFilter<"AdminLog"> | string | null
    createdAt?: DateTimeFilter<"AdminLog"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type AdminLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AdminLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AdminLogWhereInput | AdminLogWhereInput[]
    OR?: AdminLogWhereInput[]
    NOT?: AdminLogWhereInput | AdminLogWhereInput[]
    userId?: IntNullableFilter<"AdminLog"> | number | null
    action?: StringFilter<"AdminLog"> | string
    details?: StringNullableFilter<"AdminLog"> | string | null
    createdAt?: DateTimeFilter<"AdminLog"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type AdminLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AdminLogCountOrderByAggregateInput
    _avg?: AdminLogAvgOrderByAggregateInput
    _max?: AdminLogMaxOrderByAggregateInput
    _min?: AdminLogMinOrderByAggregateInput
    _sum?: AdminLogSumOrderByAggregateInput
  }

  export type AdminLogScalarWhereWithAggregatesInput = {
    AND?: AdminLogScalarWhereWithAggregatesInput | AdminLogScalarWhereWithAggregatesInput[]
    OR?: AdminLogScalarWhereWithAggregatesInput[]
    NOT?: AdminLogScalarWhereWithAggregatesInput | AdminLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AdminLog"> | number
    userId?: IntNullableWithAggregatesFilter<"AdminLog"> | number | null
    action?: StringWithAggregatesFilter<"AdminLog"> | string
    details?: StringNullableWithAggregatesFilter<"AdminLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AdminLog"> | Date | string
  }

  export type ParserLogWhereInput = {
    AND?: ParserLogWhereInput | ParserLogWhereInput[]
    OR?: ParserLogWhereInput[]
    NOT?: ParserLogWhereInput | ParserLogWhereInput[]
    id?: IntFilter<"ParserLog"> | number
    searchId?: IntFilter<"ParserLog"> | number
    platform?: EnumPlatformFilter<"ParserLog"> | $Enums.Platform
    success?: BoolFilter<"ParserLog"> | boolean
    foundCount?: IntFilter<"ParserLog"> | number
    error?: StringNullableFilter<"ParserLog"> | string | null
    duration?: IntNullableFilter<"ParserLog"> | number | null
    createdAt?: DateTimeFilter<"ParserLog"> | Date | string
  }

  export type ParserLogOrderByWithRelationInput = {
    id?: SortOrder
    searchId?: SortOrder
    platform?: SortOrder
    success?: SortOrder
    foundCount?: SortOrder
    error?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type ParserLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ParserLogWhereInput | ParserLogWhereInput[]
    OR?: ParserLogWhereInput[]
    NOT?: ParserLogWhereInput | ParserLogWhereInput[]
    searchId?: IntFilter<"ParserLog"> | number
    platform?: EnumPlatformFilter<"ParserLog"> | $Enums.Platform
    success?: BoolFilter<"ParserLog"> | boolean
    foundCount?: IntFilter<"ParserLog"> | number
    error?: StringNullableFilter<"ParserLog"> | string | null
    duration?: IntNullableFilter<"ParserLog"> | number | null
    createdAt?: DateTimeFilter<"ParserLog"> | Date | string
  }, "id">

  export type ParserLogOrderByWithAggregationInput = {
    id?: SortOrder
    searchId?: SortOrder
    platform?: SortOrder
    success?: SortOrder
    foundCount?: SortOrder
    error?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ParserLogCountOrderByAggregateInput
    _avg?: ParserLogAvgOrderByAggregateInput
    _max?: ParserLogMaxOrderByAggregateInput
    _min?: ParserLogMinOrderByAggregateInput
    _sum?: ParserLogSumOrderByAggregateInput
  }

  export type ParserLogScalarWhereWithAggregatesInput = {
    AND?: ParserLogScalarWhereWithAggregatesInput | ParserLogScalarWhereWithAggregatesInput[]
    OR?: ParserLogScalarWhereWithAggregatesInput[]
    NOT?: ParserLogScalarWhereWithAggregatesInput | ParserLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ParserLog"> | number
    searchId?: IntWithAggregatesFilter<"ParserLog"> | number
    platform?: EnumPlatformWithAggregatesFilter<"ParserLog"> | $Enums.Platform
    success?: BoolWithAggregatesFilter<"ParserLog"> | boolean
    foundCount?: IntWithAggregatesFilter<"ParserLog"> | number
    error?: StringNullableWithAggregatesFilter<"ParserLog"> | string | null
    duration?: IntNullableWithAggregatesFilter<"ParserLog"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"ParserLog"> | Date | string
  }

  export type UserCreateInput = {
    telegramId: bigint | number
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    plan?: $Enums.Plan
    subscriptionUntil?: Date | string | null
    isBanned?: boolean
    banReason?: string | null
    dailyNotificationCount?: number
    dailyNotificationLimitResetAt?: Date | string
    limitNotifiedAt?: Date | string | null
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    trialUsed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    referredBy?: UserCreateNestedOneWithoutReferralsInput
    referrals?: UserCreateNestedManyWithoutReferredByInput
    searches?: SearchCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    settings?: UserSettingsCreateNestedOneWithoutUserInput
    adminLogs?: AdminLogCreateNestedManyWithoutUserInput
    sentReferrals?: ReferralCreateNestedManyWithoutReferrerInput
    gotReferral?: ReferralCreateNestedOneWithoutReferredInput
    promoUses?: PromoCodeUseCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    telegramId: bigint | number
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    plan?: $Enums.Plan
    subscriptionUntil?: Date | string | null
    isBanned?: boolean
    banReason?: string | null
    dailyNotificationCount?: number
    dailyNotificationLimitResetAt?: Date | string
    limitNotifiedAt?: Date | string | null
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    trialUsed?: boolean
    referredByUserId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    referrals?: UserUncheckedCreateNestedManyWithoutReferredByInput
    searches?: SearchUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    settings?: UserSettingsUncheckedCreateNestedOneWithoutUserInput
    adminLogs?: AdminLogUncheckedCreateNestedManyWithoutUserInput
    sentReferrals?: ReferralUncheckedCreateNestedManyWithoutReferrerInput
    gotReferral?: ReferralUncheckedCreateNestedOneWithoutReferredInput
    promoUses?: PromoCodeUseUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referredBy?: UserUpdateOneWithoutReferralsNestedInput
    referrals?: UserUpdateManyWithoutReferredByNestedInput
    searches?: SearchUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUpdateOneWithoutUserNestedInput
    adminLogs?: AdminLogUpdateManyWithoutUserNestedInput
    sentReferrals?: ReferralUpdateManyWithoutReferrerNestedInput
    gotReferral?: ReferralUpdateOneWithoutReferredNestedInput
    promoUses?: PromoCodeUseUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    referredByUserId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrals?: UserUncheckedUpdateManyWithoutReferredByNestedInput
    searches?: SearchUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUncheckedUpdateOneWithoutUserNestedInput
    adminLogs?: AdminLogUncheckedUpdateManyWithoutUserNestedInput
    sentReferrals?: ReferralUncheckedUpdateManyWithoutReferrerNestedInput
    gotReferral?: ReferralUncheckedUpdateOneWithoutReferredNestedInput
    promoUses?: PromoCodeUseUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    telegramId: bigint | number
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    plan?: $Enums.Plan
    subscriptionUntil?: Date | string | null
    isBanned?: boolean
    banReason?: string | null
    dailyNotificationCount?: number
    dailyNotificationLimitResetAt?: Date | string
    limitNotifiedAt?: Date | string | null
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    trialUsed?: boolean
    referredByUserId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    referredByUserId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchCreateInput = {
    name?: string | null
    platform: $Enums.Platform
    url: string
    status?: $Enums.SearchStatus
    isActive?: boolean
    errorCount?: number
    lastError?: string | null
    lastCheckedAt?: Date | string | null
    lastFoundAt?: Date | string | null
    baselineInitializedAt?: Date | string | null
    lastNewListingAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSearchesInput
    listings?: ListingCreateNestedManyWithoutSearchInput
    notifications?: NotificationCreateNestedManyWithoutSearchInput
  }

  export type SearchUncheckedCreateInput = {
    id?: number
    userId: number
    name?: string | null
    platform: $Enums.Platform
    url: string
    status?: $Enums.SearchStatus
    isActive?: boolean
    errorCount?: number
    lastError?: string | null
    lastCheckedAt?: Date | string | null
    lastFoundAt?: Date | string | null
    baselineInitializedAt?: Date | string | null
    lastNewListingAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ListingUncheckedCreateNestedManyWithoutSearchInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutSearchInput
  }

  export type SearchUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    url?: StringFieldUpdateOperationsInput | string
    status?: EnumSearchStatusFieldUpdateOperationsInput | $Enums.SearchStatus
    isActive?: BoolFieldUpdateOperationsInput | boolean
    errorCount?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    lastCheckedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFoundAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    baselineInitializedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNewListingAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSearchesNestedInput
    listings?: ListingUpdateManyWithoutSearchNestedInput
    notifications?: NotificationUpdateManyWithoutSearchNestedInput
  }

  export type SearchUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    url?: StringFieldUpdateOperationsInput | string
    status?: EnumSearchStatusFieldUpdateOperationsInput | $Enums.SearchStatus
    isActive?: BoolFieldUpdateOperationsInput | boolean
    errorCount?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    lastCheckedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFoundAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    baselineInitializedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNewListingAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ListingUncheckedUpdateManyWithoutSearchNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutSearchNestedInput
  }

  export type SearchCreateManyInput = {
    id?: number
    userId: number
    name?: string | null
    platform: $Enums.Platform
    url: string
    status?: $Enums.SearchStatus
    isActive?: boolean
    errorCount?: number
    lastError?: string | null
    lastCheckedAt?: Date | string | null
    lastFoundAt?: Date | string | null
    baselineInitializedAt?: Date | string | null
    lastNewListingAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SearchUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    url?: StringFieldUpdateOperationsInput | string
    status?: EnumSearchStatusFieldUpdateOperationsInput | $Enums.SearchStatus
    isActive?: BoolFieldUpdateOperationsInput | boolean
    errorCount?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    lastCheckedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFoundAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    baselineInitializedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNewListingAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    url?: StringFieldUpdateOperationsInput | string
    status?: EnumSearchStatusFieldUpdateOperationsInput | $Enums.SearchStatus
    isActive?: BoolFieldUpdateOperationsInput | boolean
    errorCount?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    lastCheckedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFoundAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    baselineInitializedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNewListingAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingCreateInput = {
    externalId: string
    title: string
    price?: string | null
    location?: string | null
    imageUrl?: string | null
    url: string
    platform: $Enums.Platform
    publishedAt?: Date | string | null
    foundAt?: Date | string
    firstSeenAt?: Date | string
    isBaseline?: boolean
    notifiedAt?: Date | string | null
    search: SearchCreateNestedOneWithoutListingsInput
    notifications?: NotificationCreateNestedManyWithoutListingInput
    favorites?: FavoriteCreateNestedManyWithoutListingInput
  }

  export type ListingUncheckedCreateInput = {
    id?: number
    searchId: number
    externalId: string
    title: string
    price?: string | null
    location?: string | null
    imageUrl?: string | null
    url: string
    platform: $Enums.Platform
    publishedAt?: Date | string | null
    foundAt?: Date | string
    firstSeenAt?: Date | string
    isBaseline?: boolean
    notifiedAt?: Date | string | null
    notifications?: NotificationUncheckedCreateNestedManyWithoutListingInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutListingInput
  }

  export type ListingUpdateInput = {
    externalId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    price?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    foundAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isBaseline?: BoolFieldUpdateOperationsInput | boolean
    notifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    search?: SearchUpdateOneRequiredWithoutListingsNestedInput
    notifications?: NotificationUpdateManyWithoutListingNestedInput
    favorites?: FavoriteUpdateManyWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    searchId?: IntFieldUpdateOperationsInput | number
    externalId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    price?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    foundAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isBaseline?: BoolFieldUpdateOperationsInput | boolean
    notifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notifications?: NotificationUncheckedUpdateManyWithoutListingNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutListingNestedInput
  }

  export type ListingCreateManyInput = {
    id?: number
    searchId: number
    externalId: string
    title: string
    price?: string | null
    location?: string | null
    imageUrl?: string | null
    url: string
    platform: $Enums.Platform
    publishedAt?: Date | string | null
    foundAt?: Date | string
    firstSeenAt?: Date | string
    isBaseline?: boolean
    notifiedAt?: Date | string | null
  }

  export type ListingUpdateManyMutationInput = {
    externalId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    price?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    foundAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isBaseline?: BoolFieldUpdateOperationsInput | boolean
    notifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ListingUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    searchId?: IntFieldUpdateOperationsInput | number
    externalId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    price?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    foundAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isBaseline?: BoolFieldUpdateOperationsInput | boolean
    notifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PaymentCreateInput = {
    telegramPaymentChargeId?: string | null
    plan: $Enums.Plan
    days: number
    stars: number
    status?: $Enums.PaymentStatus
    createdAt?: Date | string
    completedAt?: Date | string | null
    user: UserCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: number
    userId: number
    telegramPaymentChargeId?: string | null
    plan: $Enums.Plan
    days: number
    stars: number
    status?: $Enums.PaymentStatus
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type PaymentUpdateInput = {
    telegramPaymentChargeId?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    days?: IntFieldUpdateOperationsInput | number
    stars?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    telegramPaymentChargeId?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    days?: IntFieldUpdateOperationsInput | number
    stars?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PaymentCreateManyInput = {
    id?: number
    userId: number
    telegramPaymentChargeId?: string | null
    plan: $Enums.Plan
    days: number
    stars: number
    status?: $Enums.PaymentStatus
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type PaymentUpdateManyMutationInput = {
    telegramPaymentChargeId?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    days?: IntFieldUpdateOperationsInput | number
    stars?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    telegramPaymentChargeId?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    days?: IntFieldUpdateOperationsInput | number
    stars?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FavoriteCreateInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFavoritesInput
    listing: ListingCreateNestedOneWithoutFavoritesInput
  }

  export type FavoriteUncheckedCreateInput = {
    id?: number
    userId: number
    listingId: number
    createdAt?: Date | string
  }

  export type FavoriteUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFavoritesNestedInput
    listing?: ListingUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type FavoriteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteCreateManyInput = {
    id?: number
    userId: number
    listingId: number
    createdAt?: Date | string
  }

  export type FavoriteUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    status?: $Enums.NotificationStatus
    sentAt?: Date | string | null
    failReason?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
    search: SearchCreateNestedOneWithoutNotificationsInput
    listing: ListingCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: number
    userId: number
    searchId: number
    listingId: number
    status?: $Enums.NotificationStatus
    sentAt?: Date | string | null
    failReason?: string | null
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
    search?: SearchUpdateOneRequiredWithoutNotificationsNestedInput
    listing?: ListingUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    searchId?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: number
    userId: number
    searchId: number
    listingId: number
    status?: $Enums.NotificationStatus
    sentAt?: Date | string | null
    failReason?: string | null
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    searchId?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSettingsCreateInput = {
    silentMode?: boolean
    photoMode?: boolean
    digestMode?: boolean
    workingHoursEnabled?: boolean
    workingHoursFrom?: number
    workingHoursTo?: number
    timezone?: string
    language?: string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSettingsInput
  }

  export type UserSettingsUncheckedCreateInput = {
    id?: number
    userId: number
    silentMode?: boolean
    photoMode?: boolean
    digestMode?: boolean
    workingHoursEnabled?: boolean
    workingHoursFrom?: number
    workingHoursTo?: number
    timezone?: string
    language?: string
    updatedAt?: Date | string
  }

  export type UserSettingsUpdateInput = {
    silentMode?: BoolFieldUpdateOperationsInput | boolean
    photoMode?: BoolFieldUpdateOperationsInput | boolean
    digestMode?: BoolFieldUpdateOperationsInput | boolean
    workingHoursEnabled?: BoolFieldUpdateOperationsInput | boolean
    workingHoursFrom?: IntFieldUpdateOperationsInput | number
    workingHoursTo?: IntFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSettingsNestedInput
  }

  export type UserSettingsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    silentMode?: BoolFieldUpdateOperationsInput | boolean
    photoMode?: BoolFieldUpdateOperationsInput | boolean
    digestMode?: BoolFieldUpdateOperationsInput | boolean
    workingHoursEnabled?: BoolFieldUpdateOperationsInput | boolean
    workingHoursFrom?: IntFieldUpdateOperationsInput | number
    workingHoursTo?: IntFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSettingsCreateManyInput = {
    id?: number
    userId: number
    silentMode?: boolean
    photoMode?: boolean
    digestMode?: boolean
    workingHoursEnabled?: boolean
    workingHoursFrom?: number
    workingHoursTo?: number
    timezone?: string
    language?: string
    updatedAt?: Date | string
  }

  export type UserSettingsUpdateManyMutationInput = {
    silentMode?: BoolFieldUpdateOperationsInput | boolean
    photoMode?: BoolFieldUpdateOperationsInput | boolean
    digestMode?: BoolFieldUpdateOperationsInput | boolean
    workingHoursEnabled?: BoolFieldUpdateOperationsInput | boolean
    workingHoursFrom?: IntFieldUpdateOperationsInput | number
    workingHoursTo?: IntFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSettingsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    silentMode?: BoolFieldUpdateOperationsInput | boolean
    photoMode?: BoolFieldUpdateOperationsInput | boolean
    digestMode?: BoolFieldUpdateOperationsInput | boolean
    workingHoursEnabled?: BoolFieldUpdateOperationsInput | boolean
    workingHoursFrom?: IntFieldUpdateOperationsInput | number
    workingHoursTo?: IntFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromoCodeCreateInput = {
    code: string
    plan: $Enums.Plan
    days: number
    maxUses: number
    usedCount?: number
    expiresAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    uses?: PromoCodeUseCreateNestedManyWithoutPromoCodeInput
  }

  export type PromoCodeUncheckedCreateInput = {
    id?: number
    code: string
    plan: $Enums.Plan
    days: number
    maxUses: number
    usedCount?: number
    expiresAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    uses?: PromoCodeUseUncheckedCreateNestedManyWithoutPromoCodeInput
  }

  export type PromoCodeUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    days?: IntFieldUpdateOperationsInput | number
    maxUses?: IntFieldUpdateOperationsInput | number
    usedCount?: IntFieldUpdateOperationsInput | number
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uses?: PromoCodeUseUpdateManyWithoutPromoCodeNestedInput
  }

  export type PromoCodeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    days?: IntFieldUpdateOperationsInput | number
    maxUses?: IntFieldUpdateOperationsInput | number
    usedCount?: IntFieldUpdateOperationsInput | number
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uses?: PromoCodeUseUncheckedUpdateManyWithoutPromoCodeNestedInput
  }

  export type PromoCodeCreateManyInput = {
    id?: number
    code: string
    plan: $Enums.Plan
    days: number
    maxUses: number
    usedCount?: number
    expiresAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
  }

  export type PromoCodeUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    days?: IntFieldUpdateOperationsInput | number
    maxUses?: IntFieldUpdateOperationsInput | number
    usedCount?: IntFieldUpdateOperationsInput | number
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromoCodeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    days?: IntFieldUpdateOperationsInput | number
    maxUses?: IntFieldUpdateOperationsInput | number
    usedCount?: IntFieldUpdateOperationsInput | number
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromoCodeUseCreateInput = {
    usedAt?: Date | string
    promoCode: PromoCodeCreateNestedOneWithoutUsesInput
    user: UserCreateNestedOneWithoutPromoUsesInput
  }

  export type PromoCodeUseUncheckedCreateInput = {
    id?: number
    promoCodeId: number
    userId: number
    usedAt?: Date | string
  }

  export type PromoCodeUseUpdateInput = {
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoCode?: PromoCodeUpdateOneRequiredWithoutUsesNestedInput
    user?: UserUpdateOneRequiredWithoutPromoUsesNestedInput
  }

  export type PromoCodeUseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    promoCodeId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromoCodeUseCreateManyInput = {
    id?: number
    promoCodeId: number
    userId: number
    usedAt?: Date | string
  }

  export type PromoCodeUseUpdateManyMutationInput = {
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromoCodeUseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    promoCodeId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralCreateInput = {
    bonusDays?: number
    createdAt?: Date | string
    referrer: UserCreateNestedOneWithoutSentReferralsInput
    referred: UserCreateNestedOneWithoutGotReferralInput
  }

  export type ReferralUncheckedCreateInput = {
    id?: number
    referrerId: number
    referredId: number
    bonusDays?: number
    createdAt?: Date | string
  }

  export type ReferralUpdateInput = {
    bonusDays?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrer?: UserUpdateOneRequiredWithoutSentReferralsNestedInput
    referred?: UserUpdateOneRequiredWithoutGotReferralNestedInput
  }

  export type ReferralUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    referrerId?: IntFieldUpdateOperationsInput | number
    referredId?: IntFieldUpdateOperationsInput | number
    bonusDays?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralCreateManyInput = {
    id?: number
    referrerId: number
    referredId: number
    bonusDays?: number
    createdAt?: Date | string
  }

  export type ReferralUpdateManyMutationInput = {
    bonusDays?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    referrerId?: IntFieldUpdateOperationsInput | number
    referredId?: IntFieldUpdateOperationsInput | number
    bonusDays?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminLogCreateInput = {
    action: string
    details?: string | null
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutAdminLogsInput
  }

  export type AdminLogUncheckedCreateInput = {
    id?: number
    userId?: number | null
    action: string
    details?: string | null
    createdAt?: Date | string
  }

  export type AdminLogUpdateInput = {
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAdminLogsNestedInput
  }

  export type AdminLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminLogCreateManyInput = {
    id?: number
    userId?: number | null
    action: string
    details?: string | null
    createdAt?: Date | string
  }

  export type AdminLogUpdateManyMutationInput = {
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParserLogCreateInput = {
    searchId: number
    platform: $Enums.Platform
    success: boolean
    foundCount?: number
    error?: string | null
    duration?: number | null
    createdAt?: Date | string
  }

  export type ParserLogUncheckedCreateInput = {
    id?: number
    searchId: number
    platform: $Enums.Platform
    success: boolean
    foundCount?: number
    error?: string | null
    duration?: number | null
    createdAt?: Date | string
  }

  export type ParserLogUpdateInput = {
    searchId?: IntFieldUpdateOperationsInput | number
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    success?: BoolFieldUpdateOperationsInput | boolean
    foundCount?: IntFieldUpdateOperationsInput | number
    error?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParserLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    searchId?: IntFieldUpdateOperationsInput | number
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    success?: BoolFieldUpdateOperationsInput | boolean
    foundCount?: IntFieldUpdateOperationsInput | number
    error?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParserLogCreateManyInput = {
    id?: number
    searchId: number
    platform: $Enums.Platform
    success: boolean
    foundCount?: number
    error?: string | null
    duration?: number | null
    createdAt?: Date | string
  }

  export type ParserLogUpdateManyMutationInput = {
    searchId?: IntFieldUpdateOperationsInput | number
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    success?: BoolFieldUpdateOperationsInput | boolean
    foundCount?: IntFieldUpdateOperationsInput | number
    error?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParserLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    searchId?: IntFieldUpdateOperationsInput | number
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    success?: BoolFieldUpdateOperationsInput | boolean
    foundCount?: IntFieldUpdateOperationsInput | number
    error?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumPlanFilter<$PrismaModel = never> = {
    equals?: $Enums.Plan | EnumPlanFieldRefInput<$PrismaModel>
    in?: $Enums.Plan[] | ListEnumPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.Plan[] | ListEnumPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanFilter<$PrismaModel> | $Enums.Plan
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type SearchListRelationFilter = {
    every?: SearchWhereInput
    some?: SearchWhereInput
    none?: SearchWhereInput
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type FavoriteListRelationFilter = {
    every?: FavoriteWhereInput
    some?: FavoriteWhereInput
    none?: FavoriteWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type UserSettingsNullableScalarRelationFilter = {
    is?: UserSettingsWhereInput | null
    isNot?: UserSettingsWhereInput | null
  }

  export type AdminLogListRelationFilter = {
    every?: AdminLogWhereInput
    some?: AdminLogWhereInput
    none?: AdminLogWhereInput
  }

  export type ReferralListRelationFilter = {
    every?: ReferralWhereInput
    some?: ReferralWhereInput
    none?: ReferralWhereInput
  }

  export type ReferralNullableScalarRelationFilter = {
    is?: ReferralWhereInput | null
    isNot?: ReferralWhereInput | null
  }

  export type PromoCodeUseListRelationFilter = {
    every?: PromoCodeUseWhereInput
    some?: PromoCodeUseWhereInput
    none?: PromoCodeUseWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SearchOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FavoriteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AdminLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReferralOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PromoCodeUseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    plan?: SortOrder
    subscriptionUntil?: SortOrder
    isBanned?: SortOrder
    banReason?: SortOrder
    dailyNotificationCount?: SortOrder
    dailyNotificationLimitResetAt?: SortOrder
    limitNotifiedAt?: SortOrder
    trialStartedAt?: SortOrder
    trialEndsAt?: SortOrder
    trialUsed?: SortOrder
    referredByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastActiveAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    dailyNotificationCount?: SortOrder
    referredByUserId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    plan?: SortOrder
    subscriptionUntil?: SortOrder
    isBanned?: SortOrder
    banReason?: SortOrder
    dailyNotificationCount?: SortOrder
    dailyNotificationLimitResetAt?: SortOrder
    limitNotifiedAt?: SortOrder
    trialStartedAt?: SortOrder
    trialEndsAt?: SortOrder
    trialUsed?: SortOrder
    referredByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastActiveAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    plan?: SortOrder
    subscriptionUntil?: SortOrder
    isBanned?: SortOrder
    banReason?: SortOrder
    dailyNotificationCount?: SortOrder
    dailyNotificationLimitResetAt?: SortOrder
    limitNotifiedAt?: SortOrder
    trialStartedAt?: SortOrder
    trialEndsAt?: SortOrder
    trialUsed?: SortOrder
    referredByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastActiveAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    dailyNotificationCount?: SortOrder
    referredByUserId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumPlanWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Plan | EnumPlanFieldRefInput<$PrismaModel>
    in?: $Enums.Plan[] | ListEnumPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.Plan[] | ListEnumPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanWithAggregatesFilter<$PrismaModel> | $Enums.Plan
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanFilter<$PrismaModel>
    _max?: NestedEnumPlanFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumPlatformFilter<$PrismaModel = never> = {
    equals?: $Enums.Platform | EnumPlatformFieldRefInput<$PrismaModel>
    in?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumPlatformFilter<$PrismaModel> | $Enums.Platform
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumSearchStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SearchStatus | EnumSearchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SearchStatus[] | ListEnumSearchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SearchStatus[] | ListEnumSearchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSearchStatusFilter<$PrismaModel> | $Enums.SearchStatus
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ListingListRelationFilter = {
    every?: ListingWhereInput
    some?: ListingWhereInput
    none?: ListingWhereInput
  }

  export type ListingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SearchCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    platform?: SortOrder
    url?: SortOrder
    status?: SortOrder
    isActive?: SortOrder
    errorCount?: SortOrder
    lastError?: SortOrder
    lastCheckedAt?: SortOrder
    lastFoundAt?: SortOrder
    baselineInitializedAt?: SortOrder
    lastNewListingAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SearchAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    errorCount?: SortOrder
  }

  export type SearchMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    platform?: SortOrder
    url?: SortOrder
    status?: SortOrder
    isActive?: SortOrder
    errorCount?: SortOrder
    lastError?: SortOrder
    lastCheckedAt?: SortOrder
    lastFoundAt?: SortOrder
    baselineInitializedAt?: SortOrder
    lastNewListingAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SearchMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    platform?: SortOrder
    url?: SortOrder
    status?: SortOrder
    isActive?: SortOrder
    errorCount?: SortOrder
    lastError?: SortOrder
    lastCheckedAt?: SortOrder
    lastFoundAt?: SortOrder
    baselineInitializedAt?: SortOrder
    lastNewListingAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SearchSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    errorCount?: SortOrder
  }

  export type EnumPlatformWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Platform | EnumPlatformFieldRefInput<$PrismaModel>
    in?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumPlatformWithAggregatesFilter<$PrismaModel> | $Enums.Platform
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlatformFilter<$PrismaModel>
    _max?: NestedEnumPlatformFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumSearchStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SearchStatus | EnumSearchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SearchStatus[] | ListEnumSearchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SearchStatus[] | ListEnumSearchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSearchStatusWithAggregatesFilter<$PrismaModel> | $Enums.SearchStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSearchStatusFilter<$PrismaModel>
    _max?: NestedEnumSearchStatusFilter<$PrismaModel>
  }

  export type SearchScalarRelationFilter = {
    is?: SearchWhereInput
    isNot?: SearchWhereInput
  }

  export type ListingSearchIdExternalIdCompoundUniqueInput = {
    searchId: number
    externalId: string
  }

  export type ListingCountOrderByAggregateInput = {
    id?: SortOrder
    searchId?: SortOrder
    externalId?: SortOrder
    title?: SortOrder
    price?: SortOrder
    location?: SortOrder
    imageUrl?: SortOrder
    url?: SortOrder
    platform?: SortOrder
    publishedAt?: SortOrder
    foundAt?: SortOrder
    firstSeenAt?: SortOrder
    isBaseline?: SortOrder
    notifiedAt?: SortOrder
  }

  export type ListingAvgOrderByAggregateInput = {
    id?: SortOrder
    searchId?: SortOrder
  }

  export type ListingMaxOrderByAggregateInput = {
    id?: SortOrder
    searchId?: SortOrder
    externalId?: SortOrder
    title?: SortOrder
    price?: SortOrder
    location?: SortOrder
    imageUrl?: SortOrder
    url?: SortOrder
    platform?: SortOrder
    publishedAt?: SortOrder
    foundAt?: SortOrder
    firstSeenAt?: SortOrder
    isBaseline?: SortOrder
    notifiedAt?: SortOrder
  }

  export type ListingMinOrderByAggregateInput = {
    id?: SortOrder
    searchId?: SortOrder
    externalId?: SortOrder
    title?: SortOrder
    price?: SortOrder
    location?: SortOrder
    imageUrl?: SortOrder
    url?: SortOrder
    platform?: SortOrder
    publishedAt?: SortOrder
    foundAt?: SortOrder
    firstSeenAt?: SortOrder
    isBaseline?: SortOrder
    notifiedAt?: SortOrder
  }

  export type ListingSumOrderByAggregateInput = {
    id?: SortOrder
    searchId?: SortOrder
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    telegramPaymentChargeId?: SortOrder
    plan?: SortOrder
    days?: SortOrder
    stars?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    days?: SortOrder
    stars?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    telegramPaymentChargeId?: SortOrder
    plan?: SortOrder
    days?: SortOrder
    stars?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    telegramPaymentChargeId?: SortOrder
    plan?: SortOrder
    days?: SortOrder
    stars?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    days?: SortOrder
    stars?: SortOrder
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type ListingScalarRelationFilter = {
    is?: ListingWhereInput
    isNot?: ListingWhereInput
  }

  export type FavoriteUserIdListingIdCompoundUniqueInput = {
    userId: number
    listingId: number
  }

  export type FavoriteCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
    createdAt?: SortOrder
  }

  export type FavoriteAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
  }

  export type FavoriteMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
    createdAt?: SortOrder
  }

  export type FavoriteMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
    createdAt?: SortOrder
  }

  export type FavoriteSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
  }

  export type EnumNotificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationStatus | EnumNotificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationStatusFilter<$PrismaModel> | $Enums.NotificationStatus
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    searchId?: SortOrder
    listingId?: SortOrder
    status?: SortOrder
    sentAt?: SortOrder
    failReason?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    searchId?: SortOrder
    listingId?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    searchId?: SortOrder
    listingId?: SortOrder
    status?: SortOrder
    sentAt?: SortOrder
    failReason?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    searchId?: SortOrder
    listingId?: SortOrder
    status?: SortOrder
    sentAt?: SortOrder
    failReason?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    searchId?: SortOrder
    listingId?: SortOrder
  }

  export type EnumNotificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationStatus | EnumNotificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.NotificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationStatusFilter<$PrismaModel>
    _max?: NestedEnumNotificationStatusFilter<$PrismaModel>
  }

  export type UserSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    silentMode?: SortOrder
    photoMode?: SortOrder
    digestMode?: SortOrder
    workingHoursEnabled?: SortOrder
    workingHoursFrom?: SortOrder
    workingHoursTo?: SortOrder
    timezone?: SortOrder
    language?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSettingsAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    workingHoursFrom?: SortOrder
    workingHoursTo?: SortOrder
  }

  export type UserSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    silentMode?: SortOrder
    photoMode?: SortOrder
    digestMode?: SortOrder
    workingHoursEnabled?: SortOrder
    workingHoursFrom?: SortOrder
    workingHoursTo?: SortOrder
    timezone?: SortOrder
    language?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    silentMode?: SortOrder
    photoMode?: SortOrder
    digestMode?: SortOrder
    workingHoursEnabled?: SortOrder
    workingHoursFrom?: SortOrder
    workingHoursTo?: SortOrder
    timezone?: SortOrder
    language?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSettingsSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    workingHoursFrom?: SortOrder
    workingHoursTo?: SortOrder
  }

  export type PromoCodeCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    plan?: SortOrder
    days?: SortOrder
    maxUses?: SortOrder
    usedCount?: SortOrder
    expiresAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type PromoCodeAvgOrderByAggregateInput = {
    id?: SortOrder
    days?: SortOrder
    maxUses?: SortOrder
    usedCount?: SortOrder
  }

  export type PromoCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    plan?: SortOrder
    days?: SortOrder
    maxUses?: SortOrder
    usedCount?: SortOrder
    expiresAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type PromoCodeMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    plan?: SortOrder
    days?: SortOrder
    maxUses?: SortOrder
    usedCount?: SortOrder
    expiresAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type PromoCodeSumOrderByAggregateInput = {
    id?: SortOrder
    days?: SortOrder
    maxUses?: SortOrder
    usedCount?: SortOrder
  }

  export type PromoCodeScalarRelationFilter = {
    is?: PromoCodeWhereInput
    isNot?: PromoCodeWhereInput
  }

  export type PromoCodeUsePromoCodeIdUserIdCompoundUniqueInput = {
    promoCodeId: number
    userId: number
  }

  export type PromoCodeUseCountOrderByAggregateInput = {
    id?: SortOrder
    promoCodeId?: SortOrder
    userId?: SortOrder
    usedAt?: SortOrder
  }

  export type PromoCodeUseAvgOrderByAggregateInput = {
    id?: SortOrder
    promoCodeId?: SortOrder
    userId?: SortOrder
  }

  export type PromoCodeUseMaxOrderByAggregateInput = {
    id?: SortOrder
    promoCodeId?: SortOrder
    userId?: SortOrder
    usedAt?: SortOrder
  }

  export type PromoCodeUseMinOrderByAggregateInput = {
    id?: SortOrder
    promoCodeId?: SortOrder
    userId?: SortOrder
    usedAt?: SortOrder
  }

  export type PromoCodeUseSumOrderByAggregateInput = {
    id?: SortOrder
    promoCodeId?: SortOrder
    userId?: SortOrder
  }

  export type ReferralCountOrderByAggregateInput = {
    id?: SortOrder
    referrerId?: SortOrder
    referredId?: SortOrder
    bonusDays?: SortOrder
    createdAt?: SortOrder
  }

  export type ReferralAvgOrderByAggregateInput = {
    id?: SortOrder
    referrerId?: SortOrder
    referredId?: SortOrder
    bonusDays?: SortOrder
  }

  export type ReferralMaxOrderByAggregateInput = {
    id?: SortOrder
    referrerId?: SortOrder
    referredId?: SortOrder
    bonusDays?: SortOrder
    createdAt?: SortOrder
  }

  export type ReferralMinOrderByAggregateInput = {
    id?: SortOrder
    referrerId?: SortOrder
    referredId?: SortOrder
    bonusDays?: SortOrder
    createdAt?: SortOrder
  }

  export type ReferralSumOrderByAggregateInput = {
    id?: SortOrder
    referrerId?: SortOrder
    referredId?: SortOrder
    bonusDays?: SortOrder
  }

  export type AdminLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type AdminLogAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type AdminLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type AdminLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type AdminLogSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type ParserLogCountOrderByAggregateInput = {
    id?: SortOrder
    searchId?: SortOrder
    platform?: SortOrder
    success?: SortOrder
    foundCount?: SortOrder
    error?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
  }

  export type ParserLogAvgOrderByAggregateInput = {
    id?: SortOrder
    searchId?: SortOrder
    foundCount?: SortOrder
    duration?: SortOrder
  }

  export type ParserLogMaxOrderByAggregateInput = {
    id?: SortOrder
    searchId?: SortOrder
    platform?: SortOrder
    success?: SortOrder
    foundCount?: SortOrder
    error?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
  }

  export type ParserLogMinOrderByAggregateInput = {
    id?: SortOrder
    searchId?: SortOrder
    platform?: SortOrder
    success?: SortOrder
    foundCount?: SortOrder
    error?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
  }

  export type ParserLogSumOrderByAggregateInput = {
    id?: SortOrder
    searchId?: SortOrder
    foundCount?: SortOrder
    duration?: SortOrder
  }

  export type UserCreateNestedOneWithoutReferralsInput = {
    create?: XOR<UserCreateWithoutReferralsInput, UserUncheckedCreateWithoutReferralsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReferralsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutReferredByInput = {
    create?: XOR<UserCreateWithoutReferredByInput, UserUncheckedCreateWithoutReferredByInput> | UserCreateWithoutReferredByInput[] | UserUncheckedCreateWithoutReferredByInput[]
    connectOrCreate?: UserCreateOrConnectWithoutReferredByInput | UserCreateOrConnectWithoutReferredByInput[]
    createMany?: UserCreateManyReferredByInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type SearchCreateNestedManyWithoutUserInput = {
    create?: XOR<SearchCreateWithoutUserInput, SearchUncheckedCreateWithoutUserInput> | SearchCreateWithoutUserInput[] | SearchUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SearchCreateOrConnectWithoutUserInput | SearchCreateOrConnectWithoutUserInput[]
    createMany?: SearchCreateManyUserInputEnvelope
    connect?: SearchWhereUniqueInput | SearchWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type FavoriteCreateNestedManyWithoutUserInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type UserSettingsCreateNestedOneWithoutUserInput = {
    create?: XOR<UserSettingsCreateWithoutUserInput, UserSettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserSettingsCreateOrConnectWithoutUserInput
    connect?: UserSettingsWhereUniqueInput
  }

  export type AdminLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AdminLogCreateWithoutUserInput, AdminLogUncheckedCreateWithoutUserInput> | AdminLogCreateWithoutUserInput[] | AdminLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AdminLogCreateOrConnectWithoutUserInput | AdminLogCreateOrConnectWithoutUserInput[]
    createMany?: AdminLogCreateManyUserInputEnvelope
    connect?: AdminLogWhereUniqueInput | AdminLogWhereUniqueInput[]
  }

  export type ReferralCreateNestedManyWithoutReferrerInput = {
    create?: XOR<ReferralCreateWithoutReferrerInput, ReferralUncheckedCreateWithoutReferrerInput> | ReferralCreateWithoutReferrerInput[] | ReferralUncheckedCreateWithoutReferrerInput[]
    connectOrCreate?: ReferralCreateOrConnectWithoutReferrerInput | ReferralCreateOrConnectWithoutReferrerInput[]
    createMany?: ReferralCreateManyReferrerInputEnvelope
    connect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
  }

  export type ReferralCreateNestedOneWithoutReferredInput = {
    create?: XOR<ReferralCreateWithoutReferredInput, ReferralUncheckedCreateWithoutReferredInput>
    connectOrCreate?: ReferralCreateOrConnectWithoutReferredInput
    connect?: ReferralWhereUniqueInput
  }

  export type PromoCodeUseCreateNestedManyWithoutUserInput = {
    create?: XOR<PromoCodeUseCreateWithoutUserInput, PromoCodeUseUncheckedCreateWithoutUserInput> | PromoCodeUseCreateWithoutUserInput[] | PromoCodeUseUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PromoCodeUseCreateOrConnectWithoutUserInput | PromoCodeUseCreateOrConnectWithoutUserInput[]
    createMany?: PromoCodeUseCreateManyUserInputEnvelope
    connect?: PromoCodeUseWhereUniqueInput | PromoCodeUseWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutReferredByInput = {
    create?: XOR<UserCreateWithoutReferredByInput, UserUncheckedCreateWithoutReferredByInput> | UserCreateWithoutReferredByInput[] | UserUncheckedCreateWithoutReferredByInput[]
    connectOrCreate?: UserCreateOrConnectWithoutReferredByInput | UserCreateOrConnectWithoutReferredByInput[]
    createMany?: UserCreateManyReferredByInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type SearchUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SearchCreateWithoutUserInput, SearchUncheckedCreateWithoutUserInput> | SearchCreateWithoutUserInput[] | SearchUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SearchCreateOrConnectWithoutUserInput | SearchCreateOrConnectWithoutUserInput[]
    createMany?: SearchCreateManyUserInputEnvelope
    connect?: SearchWhereUniqueInput | SearchWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type FavoriteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type UserSettingsUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserSettingsCreateWithoutUserInput, UserSettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserSettingsCreateOrConnectWithoutUserInput
    connect?: UserSettingsWhereUniqueInput
  }

  export type AdminLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AdminLogCreateWithoutUserInput, AdminLogUncheckedCreateWithoutUserInput> | AdminLogCreateWithoutUserInput[] | AdminLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AdminLogCreateOrConnectWithoutUserInput | AdminLogCreateOrConnectWithoutUserInput[]
    createMany?: AdminLogCreateManyUserInputEnvelope
    connect?: AdminLogWhereUniqueInput | AdminLogWhereUniqueInput[]
  }

  export type ReferralUncheckedCreateNestedManyWithoutReferrerInput = {
    create?: XOR<ReferralCreateWithoutReferrerInput, ReferralUncheckedCreateWithoutReferrerInput> | ReferralCreateWithoutReferrerInput[] | ReferralUncheckedCreateWithoutReferrerInput[]
    connectOrCreate?: ReferralCreateOrConnectWithoutReferrerInput | ReferralCreateOrConnectWithoutReferrerInput[]
    createMany?: ReferralCreateManyReferrerInputEnvelope
    connect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
  }

  export type ReferralUncheckedCreateNestedOneWithoutReferredInput = {
    create?: XOR<ReferralCreateWithoutReferredInput, ReferralUncheckedCreateWithoutReferredInput>
    connectOrCreate?: ReferralCreateOrConnectWithoutReferredInput
    connect?: ReferralWhereUniqueInput
  }

  export type PromoCodeUseUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PromoCodeUseCreateWithoutUserInput, PromoCodeUseUncheckedCreateWithoutUserInput> | PromoCodeUseCreateWithoutUserInput[] | PromoCodeUseUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PromoCodeUseCreateOrConnectWithoutUserInput | PromoCodeUseCreateOrConnectWithoutUserInput[]
    createMany?: PromoCodeUseCreateManyUserInputEnvelope
    connect?: PromoCodeUseWhereUniqueInput | PromoCodeUseWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumPlanFieldUpdateOperationsInput = {
    set?: $Enums.Plan
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneWithoutReferralsNestedInput = {
    create?: XOR<UserCreateWithoutReferralsInput, UserUncheckedCreateWithoutReferralsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReferralsInput
    upsert?: UserUpsertWithoutReferralsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReferralsInput, UserUpdateWithoutReferralsInput>, UserUncheckedUpdateWithoutReferralsInput>
  }

  export type UserUpdateManyWithoutReferredByNestedInput = {
    create?: XOR<UserCreateWithoutReferredByInput, UserUncheckedCreateWithoutReferredByInput> | UserCreateWithoutReferredByInput[] | UserUncheckedCreateWithoutReferredByInput[]
    connectOrCreate?: UserCreateOrConnectWithoutReferredByInput | UserCreateOrConnectWithoutReferredByInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutReferredByInput | UserUpsertWithWhereUniqueWithoutReferredByInput[]
    createMany?: UserCreateManyReferredByInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutReferredByInput | UserUpdateWithWhereUniqueWithoutReferredByInput[]
    updateMany?: UserUpdateManyWithWhereWithoutReferredByInput | UserUpdateManyWithWhereWithoutReferredByInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type SearchUpdateManyWithoutUserNestedInput = {
    create?: XOR<SearchCreateWithoutUserInput, SearchUncheckedCreateWithoutUserInput> | SearchCreateWithoutUserInput[] | SearchUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SearchCreateOrConnectWithoutUserInput | SearchCreateOrConnectWithoutUserInput[]
    upsert?: SearchUpsertWithWhereUniqueWithoutUserInput | SearchUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SearchCreateManyUserInputEnvelope
    set?: SearchWhereUniqueInput | SearchWhereUniqueInput[]
    disconnect?: SearchWhereUniqueInput | SearchWhereUniqueInput[]
    delete?: SearchWhereUniqueInput | SearchWhereUniqueInput[]
    connect?: SearchWhereUniqueInput | SearchWhereUniqueInput[]
    update?: SearchUpdateWithWhereUniqueWithoutUserInput | SearchUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SearchUpdateManyWithWhereWithoutUserInput | SearchUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SearchScalarWhereInput | SearchScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutUserInput | PaymentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutUserInput | PaymentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutUserInput | PaymentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type FavoriteUpdateManyWithoutUserNestedInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    upsert?: FavoriteUpsertWithWhereUniqueWithoutUserInput | FavoriteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    set?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    disconnect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    delete?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    update?: FavoriteUpdateWithWhereUniqueWithoutUserInput | FavoriteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FavoriteUpdateManyWithWhereWithoutUserInput | FavoriteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type UserSettingsUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserSettingsCreateWithoutUserInput, UserSettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserSettingsCreateOrConnectWithoutUserInput
    upsert?: UserSettingsUpsertWithoutUserInput
    disconnect?: UserSettingsWhereInput | boolean
    delete?: UserSettingsWhereInput | boolean
    connect?: UserSettingsWhereUniqueInput
    update?: XOR<XOR<UserSettingsUpdateToOneWithWhereWithoutUserInput, UserSettingsUpdateWithoutUserInput>, UserSettingsUncheckedUpdateWithoutUserInput>
  }

  export type AdminLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AdminLogCreateWithoutUserInput, AdminLogUncheckedCreateWithoutUserInput> | AdminLogCreateWithoutUserInput[] | AdminLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AdminLogCreateOrConnectWithoutUserInput | AdminLogCreateOrConnectWithoutUserInput[]
    upsert?: AdminLogUpsertWithWhereUniqueWithoutUserInput | AdminLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AdminLogCreateManyUserInputEnvelope
    set?: AdminLogWhereUniqueInput | AdminLogWhereUniqueInput[]
    disconnect?: AdminLogWhereUniqueInput | AdminLogWhereUniqueInput[]
    delete?: AdminLogWhereUniqueInput | AdminLogWhereUniqueInput[]
    connect?: AdminLogWhereUniqueInput | AdminLogWhereUniqueInput[]
    update?: AdminLogUpdateWithWhereUniqueWithoutUserInput | AdminLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AdminLogUpdateManyWithWhereWithoutUserInput | AdminLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AdminLogScalarWhereInput | AdminLogScalarWhereInput[]
  }

  export type ReferralUpdateManyWithoutReferrerNestedInput = {
    create?: XOR<ReferralCreateWithoutReferrerInput, ReferralUncheckedCreateWithoutReferrerInput> | ReferralCreateWithoutReferrerInput[] | ReferralUncheckedCreateWithoutReferrerInput[]
    connectOrCreate?: ReferralCreateOrConnectWithoutReferrerInput | ReferralCreateOrConnectWithoutReferrerInput[]
    upsert?: ReferralUpsertWithWhereUniqueWithoutReferrerInput | ReferralUpsertWithWhereUniqueWithoutReferrerInput[]
    createMany?: ReferralCreateManyReferrerInputEnvelope
    set?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    disconnect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    delete?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    connect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    update?: ReferralUpdateWithWhereUniqueWithoutReferrerInput | ReferralUpdateWithWhereUniqueWithoutReferrerInput[]
    updateMany?: ReferralUpdateManyWithWhereWithoutReferrerInput | ReferralUpdateManyWithWhereWithoutReferrerInput[]
    deleteMany?: ReferralScalarWhereInput | ReferralScalarWhereInput[]
  }

  export type ReferralUpdateOneWithoutReferredNestedInput = {
    create?: XOR<ReferralCreateWithoutReferredInput, ReferralUncheckedCreateWithoutReferredInput>
    connectOrCreate?: ReferralCreateOrConnectWithoutReferredInput
    upsert?: ReferralUpsertWithoutReferredInput
    disconnect?: ReferralWhereInput | boolean
    delete?: ReferralWhereInput | boolean
    connect?: ReferralWhereUniqueInput
    update?: XOR<XOR<ReferralUpdateToOneWithWhereWithoutReferredInput, ReferralUpdateWithoutReferredInput>, ReferralUncheckedUpdateWithoutReferredInput>
  }

  export type PromoCodeUseUpdateManyWithoutUserNestedInput = {
    create?: XOR<PromoCodeUseCreateWithoutUserInput, PromoCodeUseUncheckedCreateWithoutUserInput> | PromoCodeUseCreateWithoutUserInput[] | PromoCodeUseUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PromoCodeUseCreateOrConnectWithoutUserInput | PromoCodeUseCreateOrConnectWithoutUserInput[]
    upsert?: PromoCodeUseUpsertWithWhereUniqueWithoutUserInput | PromoCodeUseUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PromoCodeUseCreateManyUserInputEnvelope
    set?: PromoCodeUseWhereUniqueInput | PromoCodeUseWhereUniqueInput[]
    disconnect?: PromoCodeUseWhereUniqueInput | PromoCodeUseWhereUniqueInput[]
    delete?: PromoCodeUseWhereUniqueInput | PromoCodeUseWhereUniqueInput[]
    connect?: PromoCodeUseWhereUniqueInput | PromoCodeUseWhereUniqueInput[]
    update?: PromoCodeUseUpdateWithWhereUniqueWithoutUserInput | PromoCodeUseUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PromoCodeUseUpdateManyWithWhereWithoutUserInput | PromoCodeUseUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PromoCodeUseScalarWhereInput | PromoCodeUseScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUncheckedUpdateManyWithoutReferredByNestedInput = {
    create?: XOR<UserCreateWithoutReferredByInput, UserUncheckedCreateWithoutReferredByInput> | UserCreateWithoutReferredByInput[] | UserUncheckedCreateWithoutReferredByInput[]
    connectOrCreate?: UserCreateOrConnectWithoutReferredByInput | UserCreateOrConnectWithoutReferredByInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutReferredByInput | UserUpsertWithWhereUniqueWithoutReferredByInput[]
    createMany?: UserCreateManyReferredByInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutReferredByInput | UserUpdateWithWhereUniqueWithoutReferredByInput[]
    updateMany?: UserUpdateManyWithWhereWithoutReferredByInput | UserUpdateManyWithWhereWithoutReferredByInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type SearchUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SearchCreateWithoutUserInput, SearchUncheckedCreateWithoutUserInput> | SearchCreateWithoutUserInput[] | SearchUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SearchCreateOrConnectWithoutUserInput | SearchCreateOrConnectWithoutUserInput[]
    upsert?: SearchUpsertWithWhereUniqueWithoutUserInput | SearchUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SearchCreateManyUserInputEnvelope
    set?: SearchWhereUniqueInput | SearchWhereUniqueInput[]
    disconnect?: SearchWhereUniqueInput | SearchWhereUniqueInput[]
    delete?: SearchWhereUniqueInput | SearchWhereUniqueInput[]
    connect?: SearchWhereUniqueInput | SearchWhereUniqueInput[]
    update?: SearchUpdateWithWhereUniqueWithoutUserInput | SearchUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SearchUpdateManyWithWhereWithoutUserInput | SearchUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SearchScalarWhereInput | SearchScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutUserInput | PaymentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutUserInput | PaymentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutUserInput | PaymentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type FavoriteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    upsert?: FavoriteUpsertWithWhereUniqueWithoutUserInput | FavoriteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    set?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    disconnect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    delete?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    update?: FavoriteUpdateWithWhereUniqueWithoutUserInput | FavoriteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FavoriteUpdateManyWithWhereWithoutUserInput | FavoriteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type UserSettingsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserSettingsCreateWithoutUserInput, UserSettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserSettingsCreateOrConnectWithoutUserInput
    upsert?: UserSettingsUpsertWithoutUserInput
    disconnect?: UserSettingsWhereInput | boolean
    delete?: UserSettingsWhereInput | boolean
    connect?: UserSettingsWhereUniqueInput
    update?: XOR<XOR<UserSettingsUpdateToOneWithWhereWithoutUserInput, UserSettingsUpdateWithoutUserInput>, UserSettingsUncheckedUpdateWithoutUserInput>
  }

  export type AdminLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AdminLogCreateWithoutUserInput, AdminLogUncheckedCreateWithoutUserInput> | AdminLogCreateWithoutUserInput[] | AdminLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AdminLogCreateOrConnectWithoutUserInput | AdminLogCreateOrConnectWithoutUserInput[]
    upsert?: AdminLogUpsertWithWhereUniqueWithoutUserInput | AdminLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AdminLogCreateManyUserInputEnvelope
    set?: AdminLogWhereUniqueInput | AdminLogWhereUniqueInput[]
    disconnect?: AdminLogWhereUniqueInput | AdminLogWhereUniqueInput[]
    delete?: AdminLogWhereUniqueInput | AdminLogWhereUniqueInput[]
    connect?: AdminLogWhereUniqueInput | AdminLogWhereUniqueInput[]
    update?: AdminLogUpdateWithWhereUniqueWithoutUserInput | AdminLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AdminLogUpdateManyWithWhereWithoutUserInput | AdminLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AdminLogScalarWhereInput | AdminLogScalarWhereInput[]
  }

  export type ReferralUncheckedUpdateManyWithoutReferrerNestedInput = {
    create?: XOR<ReferralCreateWithoutReferrerInput, ReferralUncheckedCreateWithoutReferrerInput> | ReferralCreateWithoutReferrerInput[] | ReferralUncheckedCreateWithoutReferrerInput[]
    connectOrCreate?: ReferralCreateOrConnectWithoutReferrerInput | ReferralCreateOrConnectWithoutReferrerInput[]
    upsert?: ReferralUpsertWithWhereUniqueWithoutReferrerInput | ReferralUpsertWithWhereUniqueWithoutReferrerInput[]
    createMany?: ReferralCreateManyReferrerInputEnvelope
    set?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    disconnect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    delete?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    connect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    update?: ReferralUpdateWithWhereUniqueWithoutReferrerInput | ReferralUpdateWithWhereUniqueWithoutReferrerInput[]
    updateMany?: ReferralUpdateManyWithWhereWithoutReferrerInput | ReferralUpdateManyWithWhereWithoutReferrerInput[]
    deleteMany?: ReferralScalarWhereInput | ReferralScalarWhereInput[]
  }

  export type ReferralUncheckedUpdateOneWithoutReferredNestedInput = {
    create?: XOR<ReferralCreateWithoutReferredInput, ReferralUncheckedCreateWithoutReferredInput>
    connectOrCreate?: ReferralCreateOrConnectWithoutReferredInput
    upsert?: ReferralUpsertWithoutReferredInput
    disconnect?: ReferralWhereInput | boolean
    delete?: ReferralWhereInput | boolean
    connect?: ReferralWhereUniqueInput
    update?: XOR<XOR<ReferralUpdateToOneWithWhereWithoutReferredInput, ReferralUpdateWithoutReferredInput>, ReferralUncheckedUpdateWithoutReferredInput>
  }

  export type PromoCodeUseUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PromoCodeUseCreateWithoutUserInput, PromoCodeUseUncheckedCreateWithoutUserInput> | PromoCodeUseCreateWithoutUserInput[] | PromoCodeUseUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PromoCodeUseCreateOrConnectWithoutUserInput | PromoCodeUseCreateOrConnectWithoutUserInput[]
    upsert?: PromoCodeUseUpsertWithWhereUniqueWithoutUserInput | PromoCodeUseUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PromoCodeUseCreateManyUserInputEnvelope
    set?: PromoCodeUseWhereUniqueInput | PromoCodeUseWhereUniqueInput[]
    disconnect?: PromoCodeUseWhereUniqueInput | PromoCodeUseWhereUniqueInput[]
    delete?: PromoCodeUseWhereUniqueInput | PromoCodeUseWhereUniqueInput[]
    connect?: PromoCodeUseWhereUniqueInput | PromoCodeUseWhereUniqueInput[]
    update?: PromoCodeUseUpdateWithWhereUniqueWithoutUserInput | PromoCodeUseUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PromoCodeUseUpdateManyWithWhereWithoutUserInput | PromoCodeUseUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PromoCodeUseScalarWhereInput | PromoCodeUseScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSearchesInput = {
    create?: XOR<UserCreateWithoutSearchesInput, UserUncheckedCreateWithoutSearchesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSearchesInput
    connect?: UserWhereUniqueInput
  }

  export type ListingCreateNestedManyWithoutSearchInput = {
    create?: XOR<ListingCreateWithoutSearchInput, ListingUncheckedCreateWithoutSearchInput> | ListingCreateWithoutSearchInput[] | ListingUncheckedCreateWithoutSearchInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutSearchInput | ListingCreateOrConnectWithoutSearchInput[]
    createMany?: ListingCreateManySearchInputEnvelope
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutSearchInput = {
    create?: XOR<NotificationCreateWithoutSearchInput, NotificationUncheckedCreateWithoutSearchInput> | NotificationCreateWithoutSearchInput[] | NotificationUncheckedCreateWithoutSearchInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutSearchInput | NotificationCreateOrConnectWithoutSearchInput[]
    createMany?: NotificationCreateManySearchInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type ListingUncheckedCreateNestedManyWithoutSearchInput = {
    create?: XOR<ListingCreateWithoutSearchInput, ListingUncheckedCreateWithoutSearchInput> | ListingCreateWithoutSearchInput[] | ListingUncheckedCreateWithoutSearchInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutSearchInput | ListingCreateOrConnectWithoutSearchInput[]
    createMany?: ListingCreateManySearchInputEnvelope
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutSearchInput = {
    create?: XOR<NotificationCreateWithoutSearchInput, NotificationUncheckedCreateWithoutSearchInput> | NotificationCreateWithoutSearchInput[] | NotificationUncheckedCreateWithoutSearchInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutSearchInput | NotificationCreateOrConnectWithoutSearchInput[]
    createMany?: NotificationCreateManySearchInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type EnumPlatformFieldUpdateOperationsInput = {
    set?: $Enums.Platform
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumSearchStatusFieldUpdateOperationsInput = {
    set?: $Enums.SearchStatus
  }

  export type UserUpdateOneRequiredWithoutSearchesNestedInput = {
    create?: XOR<UserCreateWithoutSearchesInput, UserUncheckedCreateWithoutSearchesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSearchesInput
    upsert?: UserUpsertWithoutSearchesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSearchesInput, UserUpdateWithoutSearchesInput>, UserUncheckedUpdateWithoutSearchesInput>
  }

  export type ListingUpdateManyWithoutSearchNestedInput = {
    create?: XOR<ListingCreateWithoutSearchInput, ListingUncheckedCreateWithoutSearchInput> | ListingCreateWithoutSearchInput[] | ListingUncheckedCreateWithoutSearchInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutSearchInput | ListingCreateOrConnectWithoutSearchInput[]
    upsert?: ListingUpsertWithWhereUniqueWithoutSearchInput | ListingUpsertWithWhereUniqueWithoutSearchInput[]
    createMany?: ListingCreateManySearchInputEnvelope
    set?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    disconnect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    delete?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    update?: ListingUpdateWithWhereUniqueWithoutSearchInput | ListingUpdateWithWhereUniqueWithoutSearchInput[]
    updateMany?: ListingUpdateManyWithWhereWithoutSearchInput | ListingUpdateManyWithWhereWithoutSearchInput[]
    deleteMany?: ListingScalarWhereInput | ListingScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutSearchNestedInput = {
    create?: XOR<NotificationCreateWithoutSearchInput, NotificationUncheckedCreateWithoutSearchInput> | NotificationCreateWithoutSearchInput[] | NotificationUncheckedCreateWithoutSearchInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutSearchInput | NotificationCreateOrConnectWithoutSearchInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutSearchInput | NotificationUpsertWithWhereUniqueWithoutSearchInput[]
    createMany?: NotificationCreateManySearchInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutSearchInput | NotificationUpdateWithWhereUniqueWithoutSearchInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutSearchInput | NotificationUpdateManyWithWhereWithoutSearchInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type ListingUncheckedUpdateManyWithoutSearchNestedInput = {
    create?: XOR<ListingCreateWithoutSearchInput, ListingUncheckedCreateWithoutSearchInput> | ListingCreateWithoutSearchInput[] | ListingUncheckedCreateWithoutSearchInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutSearchInput | ListingCreateOrConnectWithoutSearchInput[]
    upsert?: ListingUpsertWithWhereUniqueWithoutSearchInput | ListingUpsertWithWhereUniqueWithoutSearchInput[]
    createMany?: ListingCreateManySearchInputEnvelope
    set?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    disconnect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    delete?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    update?: ListingUpdateWithWhereUniqueWithoutSearchInput | ListingUpdateWithWhereUniqueWithoutSearchInput[]
    updateMany?: ListingUpdateManyWithWhereWithoutSearchInput | ListingUpdateManyWithWhereWithoutSearchInput[]
    deleteMany?: ListingScalarWhereInput | ListingScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutSearchNestedInput = {
    create?: XOR<NotificationCreateWithoutSearchInput, NotificationUncheckedCreateWithoutSearchInput> | NotificationCreateWithoutSearchInput[] | NotificationUncheckedCreateWithoutSearchInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutSearchInput | NotificationCreateOrConnectWithoutSearchInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutSearchInput | NotificationUpsertWithWhereUniqueWithoutSearchInput[]
    createMany?: NotificationCreateManySearchInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutSearchInput | NotificationUpdateWithWhereUniqueWithoutSearchInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutSearchInput | NotificationUpdateManyWithWhereWithoutSearchInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type SearchCreateNestedOneWithoutListingsInput = {
    create?: XOR<SearchCreateWithoutListingsInput, SearchUncheckedCreateWithoutListingsInput>
    connectOrCreate?: SearchCreateOrConnectWithoutListingsInput
    connect?: SearchWhereUniqueInput
  }

  export type NotificationCreateNestedManyWithoutListingInput = {
    create?: XOR<NotificationCreateWithoutListingInput, NotificationUncheckedCreateWithoutListingInput> | NotificationCreateWithoutListingInput[] | NotificationUncheckedCreateWithoutListingInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutListingInput | NotificationCreateOrConnectWithoutListingInput[]
    createMany?: NotificationCreateManyListingInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type FavoriteCreateNestedManyWithoutListingInput = {
    create?: XOR<FavoriteCreateWithoutListingInput, FavoriteUncheckedCreateWithoutListingInput> | FavoriteCreateWithoutListingInput[] | FavoriteUncheckedCreateWithoutListingInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutListingInput | FavoriteCreateOrConnectWithoutListingInput[]
    createMany?: FavoriteCreateManyListingInputEnvelope
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutListingInput = {
    create?: XOR<NotificationCreateWithoutListingInput, NotificationUncheckedCreateWithoutListingInput> | NotificationCreateWithoutListingInput[] | NotificationUncheckedCreateWithoutListingInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutListingInput | NotificationCreateOrConnectWithoutListingInput[]
    createMany?: NotificationCreateManyListingInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type FavoriteUncheckedCreateNestedManyWithoutListingInput = {
    create?: XOR<FavoriteCreateWithoutListingInput, FavoriteUncheckedCreateWithoutListingInput> | FavoriteCreateWithoutListingInput[] | FavoriteUncheckedCreateWithoutListingInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutListingInput | FavoriteCreateOrConnectWithoutListingInput[]
    createMany?: FavoriteCreateManyListingInputEnvelope
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
  }

  export type SearchUpdateOneRequiredWithoutListingsNestedInput = {
    create?: XOR<SearchCreateWithoutListingsInput, SearchUncheckedCreateWithoutListingsInput>
    connectOrCreate?: SearchCreateOrConnectWithoutListingsInput
    upsert?: SearchUpsertWithoutListingsInput
    connect?: SearchWhereUniqueInput
    update?: XOR<XOR<SearchUpdateToOneWithWhereWithoutListingsInput, SearchUpdateWithoutListingsInput>, SearchUncheckedUpdateWithoutListingsInput>
  }

  export type NotificationUpdateManyWithoutListingNestedInput = {
    create?: XOR<NotificationCreateWithoutListingInput, NotificationUncheckedCreateWithoutListingInput> | NotificationCreateWithoutListingInput[] | NotificationUncheckedCreateWithoutListingInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutListingInput | NotificationCreateOrConnectWithoutListingInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutListingInput | NotificationUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: NotificationCreateManyListingInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutListingInput | NotificationUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutListingInput | NotificationUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type FavoriteUpdateManyWithoutListingNestedInput = {
    create?: XOR<FavoriteCreateWithoutListingInput, FavoriteUncheckedCreateWithoutListingInput> | FavoriteCreateWithoutListingInput[] | FavoriteUncheckedCreateWithoutListingInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutListingInput | FavoriteCreateOrConnectWithoutListingInput[]
    upsert?: FavoriteUpsertWithWhereUniqueWithoutListingInput | FavoriteUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: FavoriteCreateManyListingInputEnvelope
    set?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    disconnect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    delete?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    update?: FavoriteUpdateWithWhereUniqueWithoutListingInput | FavoriteUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: FavoriteUpdateManyWithWhereWithoutListingInput | FavoriteUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutListingNestedInput = {
    create?: XOR<NotificationCreateWithoutListingInput, NotificationUncheckedCreateWithoutListingInput> | NotificationCreateWithoutListingInput[] | NotificationUncheckedCreateWithoutListingInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutListingInput | NotificationCreateOrConnectWithoutListingInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutListingInput | NotificationUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: NotificationCreateManyListingInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutListingInput | NotificationUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutListingInput | NotificationUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type FavoriteUncheckedUpdateManyWithoutListingNestedInput = {
    create?: XOR<FavoriteCreateWithoutListingInput, FavoriteUncheckedCreateWithoutListingInput> | FavoriteCreateWithoutListingInput[] | FavoriteUncheckedCreateWithoutListingInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutListingInput | FavoriteCreateOrConnectWithoutListingInput[]
    upsert?: FavoriteUpsertWithWhereUniqueWithoutListingInput | FavoriteUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: FavoriteCreateManyListingInputEnvelope
    set?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    disconnect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    delete?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    update?: FavoriteUpdateWithWhereUniqueWithoutListingInput | FavoriteUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: FavoriteUpdateManyWithWhereWithoutListingInput | FavoriteUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type UserUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentsInput
    upsert?: UserUpsertWithoutPaymentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPaymentsInput, UserUpdateWithoutPaymentsInput>, UserUncheckedUpdateWithoutPaymentsInput>
  }

  export type UserCreateNestedOneWithoutFavoritesInput = {
    create?: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoritesInput
    connect?: UserWhereUniqueInput
  }

  export type ListingCreateNestedOneWithoutFavoritesInput = {
    create?: XOR<ListingCreateWithoutFavoritesInput, ListingUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: ListingCreateOrConnectWithoutFavoritesInput
    connect?: ListingWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFavoritesNestedInput = {
    create?: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoritesInput
    upsert?: UserUpsertWithoutFavoritesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFavoritesInput, UserUpdateWithoutFavoritesInput>, UserUncheckedUpdateWithoutFavoritesInput>
  }

  export type ListingUpdateOneRequiredWithoutFavoritesNestedInput = {
    create?: XOR<ListingCreateWithoutFavoritesInput, ListingUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: ListingCreateOrConnectWithoutFavoritesInput
    upsert?: ListingUpsertWithoutFavoritesInput
    connect?: ListingWhereUniqueInput
    update?: XOR<XOR<ListingUpdateToOneWithWhereWithoutFavoritesInput, ListingUpdateWithoutFavoritesInput>, ListingUncheckedUpdateWithoutFavoritesInput>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type SearchCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<SearchCreateWithoutNotificationsInput, SearchUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: SearchCreateOrConnectWithoutNotificationsInput
    connect?: SearchWhereUniqueInput
  }

  export type ListingCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<ListingCreateWithoutNotificationsInput, ListingUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: ListingCreateOrConnectWithoutNotificationsInput
    connect?: ListingWhereUniqueInput
  }

  export type EnumNotificationStatusFieldUpdateOperationsInput = {
    set?: $Enums.NotificationStatus
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type SearchUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<SearchCreateWithoutNotificationsInput, SearchUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: SearchCreateOrConnectWithoutNotificationsInput
    upsert?: SearchUpsertWithoutNotificationsInput
    connect?: SearchWhereUniqueInput
    update?: XOR<XOR<SearchUpdateToOneWithWhereWithoutNotificationsInput, SearchUpdateWithoutNotificationsInput>, SearchUncheckedUpdateWithoutNotificationsInput>
  }

  export type ListingUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<ListingCreateWithoutNotificationsInput, ListingUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: ListingCreateOrConnectWithoutNotificationsInput
    upsert?: ListingUpsertWithoutNotificationsInput
    connect?: ListingWhereUniqueInput
    update?: XOR<XOR<ListingUpdateToOneWithWhereWithoutNotificationsInput, ListingUpdateWithoutNotificationsInput>, ListingUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserCreateNestedOneWithoutSettingsInput = {
    create?: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSettingsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSettingsNestedInput = {
    create?: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSettingsInput
    upsert?: UserUpsertWithoutSettingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSettingsInput, UserUpdateWithoutSettingsInput>, UserUncheckedUpdateWithoutSettingsInput>
  }

  export type PromoCodeUseCreateNestedManyWithoutPromoCodeInput = {
    create?: XOR<PromoCodeUseCreateWithoutPromoCodeInput, PromoCodeUseUncheckedCreateWithoutPromoCodeInput> | PromoCodeUseCreateWithoutPromoCodeInput[] | PromoCodeUseUncheckedCreateWithoutPromoCodeInput[]
    connectOrCreate?: PromoCodeUseCreateOrConnectWithoutPromoCodeInput | PromoCodeUseCreateOrConnectWithoutPromoCodeInput[]
    createMany?: PromoCodeUseCreateManyPromoCodeInputEnvelope
    connect?: PromoCodeUseWhereUniqueInput | PromoCodeUseWhereUniqueInput[]
  }

  export type PromoCodeUseUncheckedCreateNestedManyWithoutPromoCodeInput = {
    create?: XOR<PromoCodeUseCreateWithoutPromoCodeInput, PromoCodeUseUncheckedCreateWithoutPromoCodeInput> | PromoCodeUseCreateWithoutPromoCodeInput[] | PromoCodeUseUncheckedCreateWithoutPromoCodeInput[]
    connectOrCreate?: PromoCodeUseCreateOrConnectWithoutPromoCodeInput | PromoCodeUseCreateOrConnectWithoutPromoCodeInput[]
    createMany?: PromoCodeUseCreateManyPromoCodeInputEnvelope
    connect?: PromoCodeUseWhereUniqueInput | PromoCodeUseWhereUniqueInput[]
  }

  export type PromoCodeUseUpdateManyWithoutPromoCodeNestedInput = {
    create?: XOR<PromoCodeUseCreateWithoutPromoCodeInput, PromoCodeUseUncheckedCreateWithoutPromoCodeInput> | PromoCodeUseCreateWithoutPromoCodeInput[] | PromoCodeUseUncheckedCreateWithoutPromoCodeInput[]
    connectOrCreate?: PromoCodeUseCreateOrConnectWithoutPromoCodeInput | PromoCodeUseCreateOrConnectWithoutPromoCodeInput[]
    upsert?: PromoCodeUseUpsertWithWhereUniqueWithoutPromoCodeInput | PromoCodeUseUpsertWithWhereUniqueWithoutPromoCodeInput[]
    createMany?: PromoCodeUseCreateManyPromoCodeInputEnvelope
    set?: PromoCodeUseWhereUniqueInput | PromoCodeUseWhereUniqueInput[]
    disconnect?: PromoCodeUseWhereUniqueInput | PromoCodeUseWhereUniqueInput[]
    delete?: PromoCodeUseWhereUniqueInput | PromoCodeUseWhereUniqueInput[]
    connect?: PromoCodeUseWhereUniqueInput | PromoCodeUseWhereUniqueInput[]
    update?: PromoCodeUseUpdateWithWhereUniqueWithoutPromoCodeInput | PromoCodeUseUpdateWithWhereUniqueWithoutPromoCodeInput[]
    updateMany?: PromoCodeUseUpdateManyWithWhereWithoutPromoCodeInput | PromoCodeUseUpdateManyWithWhereWithoutPromoCodeInput[]
    deleteMany?: PromoCodeUseScalarWhereInput | PromoCodeUseScalarWhereInput[]
  }

  export type PromoCodeUseUncheckedUpdateManyWithoutPromoCodeNestedInput = {
    create?: XOR<PromoCodeUseCreateWithoutPromoCodeInput, PromoCodeUseUncheckedCreateWithoutPromoCodeInput> | PromoCodeUseCreateWithoutPromoCodeInput[] | PromoCodeUseUncheckedCreateWithoutPromoCodeInput[]
    connectOrCreate?: PromoCodeUseCreateOrConnectWithoutPromoCodeInput | PromoCodeUseCreateOrConnectWithoutPromoCodeInput[]
    upsert?: PromoCodeUseUpsertWithWhereUniqueWithoutPromoCodeInput | PromoCodeUseUpsertWithWhereUniqueWithoutPromoCodeInput[]
    createMany?: PromoCodeUseCreateManyPromoCodeInputEnvelope
    set?: PromoCodeUseWhereUniqueInput | PromoCodeUseWhereUniqueInput[]
    disconnect?: PromoCodeUseWhereUniqueInput | PromoCodeUseWhereUniqueInput[]
    delete?: PromoCodeUseWhereUniqueInput | PromoCodeUseWhereUniqueInput[]
    connect?: PromoCodeUseWhereUniqueInput | PromoCodeUseWhereUniqueInput[]
    update?: PromoCodeUseUpdateWithWhereUniqueWithoutPromoCodeInput | PromoCodeUseUpdateWithWhereUniqueWithoutPromoCodeInput[]
    updateMany?: PromoCodeUseUpdateManyWithWhereWithoutPromoCodeInput | PromoCodeUseUpdateManyWithWhereWithoutPromoCodeInput[]
    deleteMany?: PromoCodeUseScalarWhereInput | PromoCodeUseScalarWhereInput[]
  }

  export type PromoCodeCreateNestedOneWithoutUsesInput = {
    create?: XOR<PromoCodeCreateWithoutUsesInput, PromoCodeUncheckedCreateWithoutUsesInput>
    connectOrCreate?: PromoCodeCreateOrConnectWithoutUsesInput
    connect?: PromoCodeWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPromoUsesInput = {
    create?: XOR<UserCreateWithoutPromoUsesInput, UserUncheckedCreateWithoutPromoUsesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPromoUsesInput
    connect?: UserWhereUniqueInput
  }

  export type PromoCodeUpdateOneRequiredWithoutUsesNestedInput = {
    create?: XOR<PromoCodeCreateWithoutUsesInput, PromoCodeUncheckedCreateWithoutUsesInput>
    connectOrCreate?: PromoCodeCreateOrConnectWithoutUsesInput
    upsert?: PromoCodeUpsertWithoutUsesInput
    connect?: PromoCodeWhereUniqueInput
    update?: XOR<XOR<PromoCodeUpdateToOneWithWhereWithoutUsesInput, PromoCodeUpdateWithoutUsesInput>, PromoCodeUncheckedUpdateWithoutUsesInput>
  }

  export type UserUpdateOneRequiredWithoutPromoUsesNestedInput = {
    create?: XOR<UserCreateWithoutPromoUsesInput, UserUncheckedCreateWithoutPromoUsesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPromoUsesInput
    upsert?: UserUpsertWithoutPromoUsesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPromoUsesInput, UserUpdateWithoutPromoUsesInput>, UserUncheckedUpdateWithoutPromoUsesInput>
  }

  export type UserCreateNestedOneWithoutSentReferralsInput = {
    create?: XOR<UserCreateWithoutSentReferralsInput, UserUncheckedCreateWithoutSentReferralsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentReferralsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutGotReferralInput = {
    create?: XOR<UserCreateWithoutGotReferralInput, UserUncheckedCreateWithoutGotReferralInput>
    connectOrCreate?: UserCreateOrConnectWithoutGotReferralInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSentReferralsNestedInput = {
    create?: XOR<UserCreateWithoutSentReferralsInput, UserUncheckedCreateWithoutSentReferralsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentReferralsInput
    upsert?: UserUpsertWithoutSentReferralsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSentReferralsInput, UserUpdateWithoutSentReferralsInput>, UserUncheckedUpdateWithoutSentReferralsInput>
  }

  export type UserUpdateOneRequiredWithoutGotReferralNestedInput = {
    create?: XOR<UserCreateWithoutGotReferralInput, UserUncheckedCreateWithoutGotReferralInput>
    connectOrCreate?: UserCreateOrConnectWithoutGotReferralInput
    upsert?: UserUpsertWithoutGotReferralInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGotReferralInput, UserUpdateWithoutGotReferralInput>, UserUncheckedUpdateWithoutGotReferralInput>
  }

  export type UserCreateNestedOneWithoutAdminLogsInput = {
    create?: XOR<UserCreateWithoutAdminLogsInput, UserUncheckedCreateWithoutAdminLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdminLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutAdminLogsNestedInput = {
    create?: XOR<UserCreateWithoutAdminLogsInput, UserUncheckedCreateWithoutAdminLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdminLogsInput
    upsert?: UserUpsertWithoutAdminLogsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAdminLogsInput, UserUpdateWithoutAdminLogsInput>, UserUncheckedUpdateWithoutAdminLogsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumPlanFilter<$PrismaModel = never> = {
    equals?: $Enums.Plan | EnumPlanFieldRefInput<$PrismaModel>
    in?: $Enums.Plan[] | ListEnumPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.Plan[] | ListEnumPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanFilter<$PrismaModel> | $Enums.Plan
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumPlanWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Plan | EnumPlanFieldRefInput<$PrismaModel>
    in?: $Enums.Plan[] | ListEnumPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.Plan[] | ListEnumPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanWithAggregatesFilter<$PrismaModel> | $Enums.Plan
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanFilter<$PrismaModel>
    _max?: NestedEnumPlanFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumPlatformFilter<$PrismaModel = never> = {
    equals?: $Enums.Platform | EnumPlatformFieldRefInput<$PrismaModel>
    in?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumPlatformFilter<$PrismaModel> | $Enums.Platform
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumSearchStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SearchStatus | EnumSearchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SearchStatus[] | ListEnumSearchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SearchStatus[] | ListEnumSearchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSearchStatusFilter<$PrismaModel> | $Enums.SearchStatus
  }

  export type NestedEnumPlatformWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Platform | EnumPlatformFieldRefInput<$PrismaModel>
    in?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumPlatformWithAggregatesFilter<$PrismaModel> | $Enums.Platform
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlatformFilter<$PrismaModel>
    _max?: NestedEnumPlatformFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumSearchStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SearchStatus | EnumSearchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SearchStatus[] | ListEnumSearchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SearchStatus[] | ListEnumSearchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSearchStatusWithAggregatesFilter<$PrismaModel> | $Enums.SearchStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSearchStatusFilter<$PrismaModel>
    _max?: NestedEnumSearchStatusFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedEnumNotificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationStatus | EnumNotificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationStatusFilter<$PrismaModel> | $Enums.NotificationStatus
  }

  export type NestedEnumNotificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationStatus | EnumNotificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.NotificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationStatusFilter<$PrismaModel>
    _max?: NestedEnumNotificationStatusFilter<$PrismaModel>
  }

  export type UserCreateWithoutReferralsInput = {
    telegramId: bigint | number
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    plan?: $Enums.Plan
    subscriptionUntil?: Date | string | null
    isBanned?: boolean
    banReason?: string | null
    dailyNotificationCount?: number
    dailyNotificationLimitResetAt?: Date | string
    limitNotifiedAt?: Date | string | null
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    trialUsed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    referredBy?: UserCreateNestedOneWithoutReferralsInput
    searches?: SearchCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    settings?: UserSettingsCreateNestedOneWithoutUserInput
    adminLogs?: AdminLogCreateNestedManyWithoutUserInput
    sentReferrals?: ReferralCreateNestedManyWithoutReferrerInput
    gotReferral?: ReferralCreateNestedOneWithoutReferredInput
    promoUses?: PromoCodeUseCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReferralsInput = {
    id?: number
    telegramId: bigint | number
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    plan?: $Enums.Plan
    subscriptionUntil?: Date | string | null
    isBanned?: boolean
    banReason?: string | null
    dailyNotificationCount?: number
    dailyNotificationLimitResetAt?: Date | string
    limitNotifiedAt?: Date | string | null
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    trialUsed?: boolean
    referredByUserId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    searches?: SearchUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    settings?: UserSettingsUncheckedCreateNestedOneWithoutUserInput
    adminLogs?: AdminLogUncheckedCreateNestedManyWithoutUserInput
    sentReferrals?: ReferralUncheckedCreateNestedManyWithoutReferrerInput
    gotReferral?: ReferralUncheckedCreateNestedOneWithoutReferredInput
    promoUses?: PromoCodeUseUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReferralsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReferralsInput, UserUncheckedCreateWithoutReferralsInput>
  }

  export type UserCreateWithoutReferredByInput = {
    telegramId: bigint | number
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    plan?: $Enums.Plan
    subscriptionUntil?: Date | string | null
    isBanned?: boolean
    banReason?: string | null
    dailyNotificationCount?: number
    dailyNotificationLimitResetAt?: Date | string
    limitNotifiedAt?: Date | string | null
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    trialUsed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    referrals?: UserCreateNestedManyWithoutReferredByInput
    searches?: SearchCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    settings?: UserSettingsCreateNestedOneWithoutUserInput
    adminLogs?: AdminLogCreateNestedManyWithoutUserInput
    sentReferrals?: ReferralCreateNestedManyWithoutReferrerInput
    gotReferral?: ReferralCreateNestedOneWithoutReferredInput
    promoUses?: PromoCodeUseCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReferredByInput = {
    id?: number
    telegramId: bigint | number
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    plan?: $Enums.Plan
    subscriptionUntil?: Date | string | null
    isBanned?: boolean
    banReason?: string | null
    dailyNotificationCount?: number
    dailyNotificationLimitResetAt?: Date | string
    limitNotifiedAt?: Date | string | null
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    trialUsed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    referrals?: UserUncheckedCreateNestedManyWithoutReferredByInput
    searches?: SearchUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    settings?: UserSettingsUncheckedCreateNestedOneWithoutUserInput
    adminLogs?: AdminLogUncheckedCreateNestedManyWithoutUserInput
    sentReferrals?: ReferralUncheckedCreateNestedManyWithoutReferrerInput
    gotReferral?: ReferralUncheckedCreateNestedOneWithoutReferredInput
    promoUses?: PromoCodeUseUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReferredByInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReferredByInput, UserUncheckedCreateWithoutReferredByInput>
  }

  export type UserCreateManyReferredByInputEnvelope = {
    data: UserCreateManyReferredByInput | UserCreateManyReferredByInput[]
    skipDuplicates?: boolean
  }

  export type SearchCreateWithoutUserInput = {
    name?: string | null
    platform: $Enums.Platform
    url: string
    status?: $Enums.SearchStatus
    isActive?: boolean
    errorCount?: number
    lastError?: string | null
    lastCheckedAt?: Date | string | null
    lastFoundAt?: Date | string | null
    baselineInitializedAt?: Date | string | null
    lastNewListingAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ListingCreateNestedManyWithoutSearchInput
    notifications?: NotificationCreateNestedManyWithoutSearchInput
  }

  export type SearchUncheckedCreateWithoutUserInput = {
    id?: number
    name?: string | null
    platform: $Enums.Platform
    url: string
    status?: $Enums.SearchStatus
    isActive?: boolean
    errorCount?: number
    lastError?: string | null
    lastCheckedAt?: Date | string | null
    lastFoundAt?: Date | string | null
    baselineInitializedAt?: Date | string | null
    lastNewListingAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ListingUncheckedCreateNestedManyWithoutSearchInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutSearchInput
  }

  export type SearchCreateOrConnectWithoutUserInput = {
    where: SearchWhereUniqueInput
    create: XOR<SearchCreateWithoutUserInput, SearchUncheckedCreateWithoutUserInput>
  }

  export type SearchCreateManyUserInputEnvelope = {
    data: SearchCreateManyUserInput | SearchCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutUserInput = {
    telegramPaymentChargeId?: string | null
    plan: $Enums.Plan
    days: number
    stars: number
    status?: $Enums.PaymentStatus
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type PaymentUncheckedCreateWithoutUserInput = {
    id?: number
    telegramPaymentChargeId?: string | null
    plan: $Enums.Plan
    days: number
    stars: number
    status?: $Enums.PaymentStatus
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type PaymentCreateOrConnectWithoutUserInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput>
  }

  export type PaymentCreateManyUserInputEnvelope = {
    data: PaymentCreateManyUserInput | PaymentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FavoriteCreateWithoutUserInput = {
    createdAt?: Date | string
    listing: ListingCreateNestedOneWithoutFavoritesInput
  }

  export type FavoriteUncheckedCreateWithoutUserInput = {
    id?: number
    listingId: number
    createdAt?: Date | string
  }

  export type FavoriteCreateOrConnectWithoutUserInput = {
    where: FavoriteWhereUniqueInput
    create: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput>
  }

  export type FavoriteCreateManyUserInputEnvelope = {
    data: FavoriteCreateManyUserInput | FavoriteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutUserInput = {
    status?: $Enums.NotificationStatus
    sentAt?: Date | string | null
    failReason?: string | null
    createdAt?: Date | string
    search: SearchCreateNestedOneWithoutNotificationsInput
    listing: ListingCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: number
    searchId: number
    listingId: number
    status?: $Enums.NotificationStatus
    sentAt?: Date | string | null
    failReason?: string | null
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserSettingsCreateWithoutUserInput = {
    silentMode?: boolean
    photoMode?: boolean
    digestMode?: boolean
    workingHoursEnabled?: boolean
    workingHoursFrom?: number
    workingHoursTo?: number
    timezone?: string
    language?: string
    updatedAt?: Date | string
  }

  export type UserSettingsUncheckedCreateWithoutUserInput = {
    id?: number
    silentMode?: boolean
    photoMode?: boolean
    digestMode?: boolean
    workingHoursEnabled?: boolean
    workingHoursFrom?: number
    workingHoursTo?: number
    timezone?: string
    language?: string
    updatedAt?: Date | string
  }

  export type UserSettingsCreateOrConnectWithoutUserInput = {
    where: UserSettingsWhereUniqueInput
    create: XOR<UserSettingsCreateWithoutUserInput, UserSettingsUncheckedCreateWithoutUserInput>
  }

  export type AdminLogCreateWithoutUserInput = {
    action: string
    details?: string | null
    createdAt?: Date | string
  }

  export type AdminLogUncheckedCreateWithoutUserInput = {
    id?: number
    action: string
    details?: string | null
    createdAt?: Date | string
  }

  export type AdminLogCreateOrConnectWithoutUserInput = {
    where: AdminLogWhereUniqueInput
    create: XOR<AdminLogCreateWithoutUserInput, AdminLogUncheckedCreateWithoutUserInput>
  }

  export type AdminLogCreateManyUserInputEnvelope = {
    data: AdminLogCreateManyUserInput | AdminLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ReferralCreateWithoutReferrerInput = {
    bonusDays?: number
    createdAt?: Date | string
    referred: UserCreateNestedOneWithoutGotReferralInput
  }

  export type ReferralUncheckedCreateWithoutReferrerInput = {
    id?: number
    referredId: number
    bonusDays?: number
    createdAt?: Date | string
  }

  export type ReferralCreateOrConnectWithoutReferrerInput = {
    where: ReferralWhereUniqueInput
    create: XOR<ReferralCreateWithoutReferrerInput, ReferralUncheckedCreateWithoutReferrerInput>
  }

  export type ReferralCreateManyReferrerInputEnvelope = {
    data: ReferralCreateManyReferrerInput | ReferralCreateManyReferrerInput[]
    skipDuplicates?: boolean
  }

  export type ReferralCreateWithoutReferredInput = {
    bonusDays?: number
    createdAt?: Date | string
    referrer: UserCreateNestedOneWithoutSentReferralsInput
  }

  export type ReferralUncheckedCreateWithoutReferredInput = {
    id?: number
    referrerId: number
    bonusDays?: number
    createdAt?: Date | string
  }

  export type ReferralCreateOrConnectWithoutReferredInput = {
    where: ReferralWhereUniqueInput
    create: XOR<ReferralCreateWithoutReferredInput, ReferralUncheckedCreateWithoutReferredInput>
  }

  export type PromoCodeUseCreateWithoutUserInput = {
    usedAt?: Date | string
    promoCode: PromoCodeCreateNestedOneWithoutUsesInput
  }

  export type PromoCodeUseUncheckedCreateWithoutUserInput = {
    id?: number
    promoCodeId: number
    usedAt?: Date | string
  }

  export type PromoCodeUseCreateOrConnectWithoutUserInput = {
    where: PromoCodeUseWhereUniqueInput
    create: XOR<PromoCodeUseCreateWithoutUserInput, PromoCodeUseUncheckedCreateWithoutUserInput>
  }

  export type PromoCodeUseCreateManyUserInputEnvelope = {
    data: PromoCodeUseCreateManyUserInput | PromoCodeUseCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutReferralsInput = {
    update: XOR<UserUpdateWithoutReferralsInput, UserUncheckedUpdateWithoutReferralsInput>
    create: XOR<UserCreateWithoutReferralsInput, UserUncheckedCreateWithoutReferralsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReferralsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReferralsInput, UserUncheckedUpdateWithoutReferralsInput>
  }

  export type UserUpdateWithoutReferralsInput = {
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referredBy?: UserUpdateOneWithoutReferralsNestedInput
    searches?: SearchUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUpdateOneWithoutUserNestedInput
    adminLogs?: AdminLogUpdateManyWithoutUserNestedInput
    sentReferrals?: ReferralUpdateManyWithoutReferrerNestedInput
    gotReferral?: ReferralUpdateOneWithoutReferredNestedInput
    promoUses?: PromoCodeUseUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReferralsInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    referredByUserId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    searches?: SearchUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUncheckedUpdateOneWithoutUserNestedInput
    adminLogs?: AdminLogUncheckedUpdateManyWithoutUserNestedInput
    sentReferrals?: ReferralUncheckedUpdateManyWithoutReferrerNestedInput
    gotReferral?: ReferralUncheckedUpdateOneWithoutReferredNestedInput
    promoUses?: PromoCodeUseUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutReferredByInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutReferredByInput, UserUncheckedUpdateWithoutReferredByInput>
    create: XOR<UserCreateWithoutReferredByInput, UserUncheckedCreateWithoutReferredByInput>
  }

  export type UserUpdateWithWhereUniqueWithoutReferredByInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutReferredByInput, UserUncheckedUpdateWithoutReferredByInput>
  }

  export type UserUpdateManyWithWhereWithoutReferredByInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutReferredByInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: IntFilter<"User"> | number
    telegramId?: BigIntFilter<"User"> | bigint | number
    username?: StringNullableFilter<"User"> | string | null
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    plan?: EnumPlanFilter<"User"> | $Enums.Plan
    subscriptionUntil?: DateTimeNullableFilter<"User"> | Date | string | null
    isBanned?: BoolFilter<"User"> | boolean
    banReason?: StringNullableFilter<"User"> | string | null
    dailyNotificationCount?: IntFilter<"User"> | number
    dailyNotificationLimitResetAt?: DateTimeFilter<"User"> | Date | string
    limitNotifiedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    trialStartedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    trialEndsAt?: DateTimeNullableFilter<"User"> | Date | string | null
    trialUsed?: BoolFilter<"User"> | boolean
    referredByUserId?: IntNullableFilter<"User"> | number | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastActiveAt?: DateTimeFilter<"User"> | Date | string
  }

  export type SearchUpsertWithWhereUniqueWithoutUserInput = {
    where: SearchWhereUniqueInput
    update: XOR<SearchUpdateWithoutUserInput, SearchUncheckedUpdateWithoutUserInput>
    create: XOR<SearchCreateWithoutUserInput, SearchUncheckedCreateWithoutUserInput>
  }

  export type SearchUpdateWithWhereUniqueWithoutUserInput = {
    where: SearchWhereUniqueInput
    data: XOR<SearchUpdateWithoutUserInput, SearchUncheckedUpdateWithoutUserInput>
  }

  export type SearchUpdateManyWithWhereWithoutUserInput = {
    where: SearchScalarWhereInput
    data: XOR<SearchUpdateManyMutationInput, SearchUncheckedUpdateManyWithoutUserInput>
  }

  export type SearchScalarWhereInput = {
    AND?: SearchScalarWhereInput | SearchScalarWhereInput[]
    OR?: SearchScalarWhereInput[]
    NOT?: SearchScalarWhereInput | SearchScalarWhereInput[]
    id?: IntFilter<"Search"> | number
    userId?: IntFilter<"Search"> | number
    name?: StringNullableFilter<"Search"> | string | null
    platform?: EnumPlatformFilter<"Search"> | $Enums.Platform
    url?: StringFilter<"Search"> | string
    status?: EnumSearchStatusFilter<"Search"> | $Enums.SearchStatus
    isActive?: BoolFilter<"Search"> | boolean
    errorCount?: IntFilter<"Search"> | number
    lastError?: StringNullableFilter<"Search"> | string | null
    lastCheckedAt?: DateTimeNullableFilter<"Search"> | Date | string | null
    lastFoundAt?: DateTimeNullableFilter<"Search"> | Date | string | null
    baselineInitializedAt?: DateTimeNullableFilter<"Search"> | Date | string | null
    lastNewListingAt?: DateTimeNullableFilter<"Search"> | Date | string | null
    createdAt?: DateTimeFilter<"Search"> | Date | string
    updatedAt?: DateTimeFilter<"Search"> | Date | string
  }

  export type PaymentUpsertWithWhereUniqueWithoutUserInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutUserInput, PaymentUncheckedUpdateWithoutUserInput>
    create: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutUserInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutUserInput, PaymentUncheckedUpdateWithoutUserInput>
  }

  export type PaymentUpdateManyWithWhereWithoutUserInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutUserInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: IntFilter<"Payment"> | number
    userId?: IntFilter<"Payment"> | number
    telegramPaymentChargeId?: StringNullableFilter<"Payment"> | string | null
    plan?: EnumPlanFilter<"Payment"> | $Enums.Plan
    days?: IntFilter<"Payment"> | number
    stars?: IntFilter<"Payment"> | number
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    completedAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
  }

  export type FavoriteUpsertWithWhereUniqueWithoutUserInput = {
    where: FavoriteWhereUniqueInput
    update: XOR<FavoriteUpdateWithoutUserInput, FavoriteUncheckedUpdateWithoutUserInput>
    create: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput>
  }

  export type FavoriteUpdateWithWhereUniqueWithoutUserInput = {
    where: FavoriteWhereUniqueInput
    data: XOR<FavoriteUpdateWithoutUserInput, FavoriteUncheckedUpdateWithoutUserInput>
  }

  export type FavoriteUpdateManyWithWhereWithoutUserInput = {
    where: FavoriteScalarWhereInput
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyWithoutUserInput>
  }

  export type FavoriteScalarWhereInput = {
    AND?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
    OR?: FavoriteScalarWhereInput[]
    NOT?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
    id?: IntFilter<"Favorite"> | number
    userId?: IntFilter<"Favorite"> | number
    listingId?: IntFilter<"Favorite"> | number
    createdAt?: DateTimeFilter<"Favorite"> | Date | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: IntFilter<"Notification"> | number
    userId?: IntFilter<"Notification"> | number
    searchId?: IntFilter<"Notification"> | number
    listingId?: IntFilter<"Notification"> | number
    status?: EnumNotificationStatusFilter<"Notification"> | $Enums.NotificationStatus
    sentAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
    failReason?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type UserSettingsUpsertWithoutUserInput = {
    update: XOR<UserSettingsUpdateWithoutUserInput, UserSettingsUncheckedUpdateWithoutUserInput>
    create: XOR<UserSettingsCreateWithoutUserInput, UserSettingsUncheckedCreateWithoutUserInput>
    where?: UserSettingsWhereInput
  }

  export type UserSettingsUpdateToOneWithWhereWithoutUserInput = {
    where?: UserSettingsWhereInput
    data: XOR<UserSettingsUpdateWithoutUserInput, UserSettingsUncheckedUpdateWithoutUserInput>
  }

  export type UserSettingsUpdateWithoutUserInput = {
    silentMode?: BoolFieldUpdateOperationsInput | boolean
    photoMode?: BoolFieldUpdateOperationsInput | boolean
    digestMode?: BoolFieldUpdateOperationsInput | boolean
    workingHoursEnabled?: BoolFieldUpdateOperationsInput | boolean
    workingHoursFrom?: IntFieldUpdateOperationsInput | number
    workingHoursTo?: IntFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSettingsUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    silentMode?: BoolFieldUpdateOperationsInput | boolean
    photoMode?: BoolFieldUpdateOperationsInput | boolean
    digestMode?: BoolFieldUpdateOperationsInput | boolean
    workingHoursEnabled?: BoolFieldUpdateOperationsInput | boolean
    workingHoursFrom?: IntFieldUpdateOperationsInput | number
    workingHoursTo?: IntFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AdminLogWhereUniqueInput
    update: XOR<AdminLogUpdateWithoutUserInput, AdminLogUncheckedUpdateWithoutUserInput>
    create: XOR<AdminLogCreateWithoutUserInput, AdminLogUncheckedCreateWithoutUserInput>
  }

  export type AdminLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AdminLogWhereUniqueInput
    data: XOR<AdminLogUpdateWithoutUserInput, AdminLogUncheckedUpdateWithoutUserInput>
  }

  export type AdminLogUpdateManyWithWhereWithoutUserInput = {
    where: AdminLogScalarWhereInput
    data: XOR<AdminLogUpdateManyMutationInput, AdminLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AdminLogScalarWhereInput = {
    AND?: AdminLogScalarWhereInput | AdminLogScalarWhereInput[]
    OR?: AdminLogScalarWhereInput[]
    NOT?: AdminLogScalarWhereInput | AdminLogScalarWhereInput[]
    id?: IntFilter<"AdminLog"> | number
    userId?: IntNullableFilter<"AdminLog"> | number | null
    action?: StringFilter<"AdminLog"> | string
    details?: StringNullableFilter<"AdminLog"> | string | null
    createdAt?: DateTimeFilter<"AdminLog"> | Date | string
  }

  export type ReferralUpsertWithWhereUniqueWithoutReferrerInput = {
    where: ReferralWhereUniqueInput
    update: XOR<ReferralUpdateWithoutReferrerInput, ReferralUncheckedUpdateWithoutReferrerInput>
    create: XOR<ReferralCreateWithoutReferrerInput, ReferralUncheckedCreateWithoutReferrerInput>
  }

  export type ReferralUpdateWithWhereUniqueWithoutReferrerInput = {
    where: ReferralWhereUniqueInput
    data: XOR<ReferralUpdateWithoutReferrerInput, ReferralUncheckedUpdateWithoutReferrerInput>
  }

  export type ReferralUpdateManyWithWhereWithoutReferrerInput = {
    where: ReferralScalarWhereInput
    data: XOR<ReferralUpdateManyMutationInput, ReferralUncheckedUpdateManyWithoutReferrerInput>
  }

  export type ReferralScalarWhereInput = {
    AND?: ReferralScalarWhereInput | ReferralScalarWhereInput[]
    OR?: ReferralScalarWhereInput[]
    NOT?: ReferralScalarWhereInput | ReferralScalarWhereInput[]
    id?: IntFilter<"Referral"> | number
    referrerId?: IntFilter<"Referral"> | number
    referredId?: IntFilter<"Referral"> | number
    bonusDays?: IntFilter<"Referral"> | number
    createdAt?: DateTimeFilter<"Referral"> | Date | string
  }

  export type ReferralUpsertWithoutReferredInput = {
    update: XOR<ReferralUpdateWithoutReferredInput, ReferralUncheckedUpdateWithoutReferredInput>
    create: XOR<ReferralCreateWithoutReferredInput, ReferralUncheckedCreateWithoutReferredInput>
    where?: ReferralWhereInput
  }

  export type ReferralUpdateToOneWithWhereWithoutReferredInput = {
    where?: ReferralWhereInput
    data: XOR<ReferralUpdateWithoutReferredInput, ReferralUncheckedUpdateWithoutReferredInput>
  }

  export type ReferralUpdateWithoutReferredInput = {
    bonusDays?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrer?: UserUpdateOneRequiredWithoutSentReferralsNestedInput
  }

  export type ReferralUncheckedUpdateWithoutReferredInput = {
    id?: IntFieldUpdateOperationsInput | number
    referrerId?: IntFieldUpdateOperationsInput | number
    bonusDays?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromoCodeUseUpsertWithWhereUniqueWithoutUserInput = {
    where: PromoCodeUseWhereUniqueInput
    update: XOR<PromoCodeUseUpdateWithoutUserInput, PromoCodeUseUncheckedUpdateWithoutUserInput>
    create: XOR<PromoCodeUseCreateWithoutUserInput, PromoCodeUseUncheckedCreateWithoutUserInput>
  }

  export type PromoCodeUseUpdateWithWhereUniqueWithoutUserInput = {
    where: PromoCodeUseWhereUniqueInput
    data: XOR<PromoCodeUseUpdateWithoutUserInput, PromoCodeUseUncheckedUpdateWithoutUserInput>
  }

  export type PromoCodeUseUpdateManyWithWhereWithoutUserInput = {
    where: PromoCodeUseScalarWhereInput
    data: XOR<PromoCodeUseUpdateManyMutationInput, PromoCodeUseUncheckedUpdateManyWithoutUserInput>
  }

  export type PromoCodeUseScalarWhereInput = {
    AND?: PromoCodeUseScalarWhereInput | PromoCodeUseScalarWhereInput[]
    OR?: PromoCodeUseScalarWhereInput[]
    NOT?: PromoCodeUseScalarWhereInput | PromoCodeUseScalarWhereInput[]
    id?: IntFilter<"PromoCodeUse"> | number
    promoCodeId?: IntFilter<"PromoCodeUse"> | number
    userId?: IntFilter<"PromoCodeUse"> | number
    usedAt?: DateTimeFilter<"PromoCodeUse"> | Date | string
  }

  export type UserCreateWithoutSearchesInput = {
    telegramId: bigint | number
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    plan?: $Enums.Plan
    subscriptionUntil?: Date | string | null
    isBanned?: boolean
    banReason?: string | null
    dailyNotificationCount?: number
    dailyNotificationLimitResetAt?: Date | string
    limitNotifiedAt?: Date | string | null
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    trialUsed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    referredBy?: UserCreateNestedOneWithoutReferralsInput
    referrals?: UserCreateNestedManyWithoutReferredByInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    settings?: UserSettingsCreateNestedOneWithoutUserInput
    adminLogs?: AdminLogCreateNestedManyWithoutUserInput
    sentReferrals?: ReferralCreateNestedManyWithoutReferrerInput
    gotReferral?: ReferralCreateNestedOneWithoutReferredInput
    promoUses?: PromoCodeUseCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSearchesInput = {
    id?: number
    telegramId: bigint | number
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    plan?: $Enums.Plan
    subscriptionUntil?: Date | string | null
    isBanned?: boolean
    banReason?: string | null
    dailyNotificationCount?: number
    dailyNotificationLimitResetAt?: Date | string
    limitNotifiedAt?: Date | string | null
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    trialUsed?: boolean
    referredByUserId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    referrals?: UserUncheckedCreateNestedManyWithoutReferredByInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    settings?: UserSettingsUncheckedCreateNestedOneWithoutUserInput
    adminLogs?: AdminLogUncheckedCreateNestedManyWithoutUserInput
    sentReferrals?: ReferralUncheckedCreateNestedManyWithoutReferrerInput
    gotReferral?: ReferralUncheckedCreateNestedOneWithoutReferredInput
    promoUses?: PromoCodeUseUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSearchesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSearchesInput, UserUncheckedCreateWithoutSearchesInput>
  }

  export type ListingCreateWithoutSearchInput = {
    externalId: string
    title: string
    price?: string | null
    location?: string | null
    imageUrl?: string | null
    url: string
    platform: $Enums.Platform
    publishedAt?: Date | string | null
    foundAt?: Date | string
    firstSeenAt?: Date | string
    isBaseline?: boolean
    notifiedAt?: Date | string | null
    notifications?: NotificationCreateNestedManyWithoutListingInput
    favorites?: FavoriteCreateNestedManyWithoutListingInput
  }

  export type ListingUncheckedCreateWithoutSearchInput = {
    id?: number
    externalId: string
    title: string
    price?: string | null
    location?: string | null
    imageUrl?: string | null
    url: string
    platform: $Enums.Platform
    publishedAt?: Date | string | null
    foundAt?: Date | string
    firstSeenAt?: Date | string
    isBaseline?: boolean
    notifiedAt?: Date | string | null
    notifications?: NotificationUncheckedCreateNestedManyWithoutListingInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutListingInput
  }

  export type ListingCreateOrConnectWithoutSearchInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutSearchInput, ListingUncheckedCreateWithoutSearchInput>
  }

  export type ListingCreateManySearchInputEnvelope = {
    data: ListingCreateManySearchInput | ListingCreateManySearchInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutSearchInput = {
    status?: $Enums.NotificationStatus
    sentAt?: Date | string | null
    failReason?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
    listing: ListingCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateWithoutSearchInput = {
    id?: number
    userId: number
    listingId: number
    status?: $Enums.NotificationStatus
    sentAt?: Date | string | null
    failReason?: string | null
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutSearchInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutSearchInput, NotificationUncheckedCreateWithoutSearchInput>
  }

  export type NotificationCreateManySearchInputEnvelope = {
    data: NotificationCreateManySearchInput | NotificationCreateManySearchInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutSearchesInput = {
    update: XOR<UserUpdateWithoutSearchesInput, UserUncheckedUpdateWithoutSearchesInput>
    create: XOR<UserCreateWithoutSearchesInput, UserUncheckedCreateWithoutSearchesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSearchesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSearchesInput, UserUncheckedUpdateWithoutSearchesInput>
  }

  export type UserUpdateWithoutSearchesInput = {
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referredBy?: UserUpdateOneWithoutReferralsNestedInput
    referrals?: UserUpdateManyWithoutReferredByNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUpdateOneWithoutUserNestedInput
    adminLogs?: AdminLogUpdateManyWithoutUserNestedInput
    sentReferrals?: ReferralUpdateManyWithoutReferrerNestedInput
    gotReferral?: ReferralUpdateOneWithoutReferredNestedInput
    promoUses?: PromoCodeUseUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSearchesInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    referredByUserId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrals?: UserUncheckedUpdateManyWithoutReferredByNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUncheckedUpdateOneWithoutUserNestedInput
    adminLogs?: AdminLogUncheckedUpdateManyWithoutUserNestedInput
    sentReferrals?: ReferralUncheckedUpdateManyWithoutReferrerNestedInput
    gotReferral?: ReferralUncheckedUpdateOneWithoutReferredNestedInput
    promoUses?: PromoCodeUseUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ListingUpsertWithWhereUniqueWithoutSearchInput = {
    where: ListingWhereUniqueInput
    update: XOR<ListingUpdateWithoutSearchInput, ListingUncheckedUpdateWithoutSearchInput>
    create: XOR<ListingCreateWithoutSearchInput, ListingUncheckedCreateWithoutSearchInput>
  }

  export type ListingUpdateWithWhereUniqueWithoutSearchInput = {
    where: ListingWhereUniqueInput
    data: XOR<ListingUpdateWithoutSearchInput, ListingUncheckedUpdateWithoutSearchInput>
  }

  export type ListingUpdateManyWithWhereWithoutSearchInput = {
    where: ListingScalarWhereInput
    data: XOR<ListingUpdateManyMutationInput, ListingUncheckedUpdateManyWithoutSearchInput>
  }

  export type ListingScalarWhereInput = {
    AND?: ListingScalarWhereInput | ListingScalarWhereInput[]
    OR?: ListingScalarWhereInput[]
    NOT?: ListingScalarWhereInput | ListingScalarWhereInput[]
    id?: IntFilter<"Listing"> | number
    searchId?: IntFilter<"Listing"> | number
    externalId?: StringFilter<"Listing"> | string
    title?: StringFilter<"Listing"> | string
    price?: StringNullableFilter<"Listing"> | string | null
    location?: StringNullableFilter<"Listing"> | string | null
    imageUrl?: StringNullableFilter<"Listing"> | string | null
    url?: StringFilter<"Listing"> | string
    platform?: EnumPlatformFilter<"Listing"> | $Enums.Platform
    publishedAt?: DateTimeNullableFilter<"Listing"> | Date | string | null
    foundAt?: DateTimeFilter<"Listing"> | Date | string
    firstSeenAt?: DateTimeFilter<"Listing"> | Date | string
    isBaseline?: BoolFilter<"Listing"> | boolean
    notifiedAt?: DateTimeNullableFilter<"Listing"> | Date | string | null
  }

  export type NotificationUpsertWithWhereUniqueWithoutSearchInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutSearchInput, NotificationUncheckedUpdateWithoutSearchInput>
    create: XOR<NotificationCreateWithoutSearchInput, NotificationUncheckedCreateWithoutSearchInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutSearchInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutSearchInput, NotificationUncheckedUpdateWithoutSearchInput>
  }

  export type NotificationUpdateManyWithWhereWithoutSearchInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutSearchInput>
  }

  export type SearchCreateWithoutListingsInput = {
    name?: string | null
    platform: $Enums.Platform
    url: string
    status?: $Enums.SearchStatus
    isActive?: boolean
    errorCount?: number
    lastError?: string | null
    lastCheckedAt?: Date | string | null
    lastFoundAt?: Date | string | null
    baselineInitializedAt?: Date | string | null
    lastNewListingAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSearchesInput
    notifications?: NotificationCreateNestedManyWithoutSearchInput
  }

  export type SearchUncheckedCreateWithoutListingsInput = {
    id?: number
    userId: number
    name?: string | null
    platform: $Enums.Platform
    url: string
    status?: $Enums.SearchStatus
    isActive?: boolean
    errorCount?: number
    lastError?: string | null
    lastCheckedAt?: Date | string | null
    lastFoundAt?: Date | string | null
    baselineInitializedAt?: Date | string | null
    lastNewListingAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    notifications?: NotificationUncheckedCreateNestedManyWithoutSearchInput
  }

  export type SearchCreateOrConnectWithoutListingsInput = {
    where: SearchWhereUniqueInput
    create: XOR<SearchCreateWithoutListingsInput, SearchUncheckedCreateWithoutListingsInput>
  }

  export type NotificationCreateWithoutListingInput = {
    status?: $Enums.NotificationStatus
    sentAt?: Date | string | null
    failReason?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
    search: SearchCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateWithoutListingInput = {
    id?: number
    userId: number
    searchId: number
    status?: $Enums.NotificationStatus
    sentAt?: Date | string | null
    failReason?: string | null
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutListingInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutListingInput, NotificationUncheckedCreateWithoutListingInput>
  }

  export type NotificationCreateManyListingInputEnvelope = {
    data: NotificationCreateManyListingInput | NotificationCreateManyListingInput[]
    skipDuplicates?: boolean
  }

  export type FavoriteCreateWithoutListingInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFavoritesInput
  }

  export type FavoriteUncheckedCreateWithoutListingInput = {
    id?: number
    userId: number
    createdAt?: Date | string
  }

  export type FavoriteCreateOrConnectWithoutListingInput = {
    where: FavoriteWhereUniqueInput
    create: XOR<FavoriteCreateWithoutListingInput, FavoriteUncheckedCreateWithoutListingInput>
  }

  export type FavoriteCreateManyListingInputEnvelope = {
    data: FavoriteCreateManyListingInput | FavoriteCreateManyListingInput[]
    skipDuplicates?: boolean
  }

  export type SearchUpsertWithoutListingsInput = {
    update: XOR<SearchUpdateWithoutListingsInput, SearchUncheckedUpdateWithoutListingsInput>
    create: XOR<SearchCreateWithoutListingsInput, SearchUncheckedCreateWithoutListingsInput>
    where?: SearchWhereInput
  }

  export type SearchUpdateToOneWithWhereWithoutListingsInput = {
    where?: SearchWhereInput
    data: XOR<SearchUpdateWithoutListingsInput, SearchUncheckedUpdateWithoutListingsInput>
  }

  export type SearchUpdateWithoutListingsInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    url?: StringFieldUpdateOperationsInput | string
    status?: EnumSearchStatusFieldUpdateOperationsInput | $Enums.SearchStatus
    isActive?: BoolFieldUpdateOperationsInput | boolean
    errorCount?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    lastCheckedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFoundAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    baselineInitializedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNewListingAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSearchesNestedInput
    notifications?: NotificationUpdateManyWithoutSearchNestedInput
  }

  export type SearchUncheckedUpdateWithoutListingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    url?: StringFieldUpdateOperationsInput | string
    status?: EnumSearchStatusFieldUpdateOperationsInput | $Enums.SearchStatus
    isActive?: BoolFieldUpdateOperationsInput | boolean
    errorCount?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    lastCheckedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFoundAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    baselineInitializedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNewListingAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notifications?: NotificationUncheckedUpdateManyWithoutSearchNestedInput
  }

  export type NotificationUpsertWithWhereUniqueWithoutListingInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutListingInput, NotificationUncheckedUpdateWithoutListingInput>
    create: XOR<NotificationCreateWithoutListingInput, NotificationUncheckedCreateWithoutListingInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutListingInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutListingInput, NotificationUncheckedUpdateWithoutListingInput>
  }

  export type NotificationUpdateManyWithWhereWithoutListingInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutListingInput>
  }

  export type FavoriteUpsertWithWhereUniqueWithoutListingInput = {
    where: FavoriteWhereUniqueInput
    update: XOR<FavoriteUpdateWithoutListingInput, FavoriteUncheckedUpdateWithoutListingInput>
    create: XOR<FavoriteCreateWithoutListingInput, FavoriteUncheckedCreateWithoutListingInput>
  }

  export type FavoriteUpdateWithWhereUniqueWithoutListingInput = {
    where: FavoriteWhereUniqueInput
    data: XOR<FavoriteUpdateWithoutListingInput, FavoriteUncheckedUpdateWithoutListingInput>
  }

  export type FavoriteUpdateManyWithWhereWithoutListingInput = {
    where: FavoriteScalarWhereInput
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyWithoutListingInput>
  }

  export type UserCreateWithoutPaymentsInput = {
    telegramId: bigint | number
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    plan?: $Enums.Plan
    subscriptionUntil?: Date | string | null
    isBanned?: boolean
    banReason?: string | null
    dailyNotificationCount?: number
    dailyNotificationLimitResetAt?: Date | string
    limitNotifiedAt?: Date | string | null
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    trialUsed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    referredBy?: UserCreateNestedOneWithoutReferralsInput
    referrals?: UserCreateNestedManyWithoutReferredByInput
    searches?: SearchCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    settings?: UserSettingsCreateNestedOneWithoutUserInput
    adminLogs?: AdminLogCreateNestedManyWithoutUserInput
    sentReferrals?: ReferralCreateNestedManyWithoutReferrerInput
    gotReferral?: ReferralCreateNestedOneWithoutReferredInput
    promoUses?: PromoCodeUseCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPaymentsInput = {
    id?: number
    telegramId: bigint | number
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    plan?: $Enums.Plan
    subscriptionUntil?: Date | string | null
    isBanned?: boolean
    banReason?: string | null
    dailyNotificationCount?: number
    dailyNotificationLimitResetAt?: Date | string
    limitNotifiedAt?: Date | string | null
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    trialUsed?: boolean
    referredByUserId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    referrals?: UserUncheckedCreateNestedManyWithoutReferredByInput
    searches?: SearchUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    settings?: UserSettingsUncheckedCreateNestedOneWithoutUserInput
    adminLogs?: AdminLogUncheckedCreateNestedManyWithoutUserInput
    sentReferrals?: ReferralUncheckedCreateNestedManyWithoutReferrerInput
    gotReferral?: ReferralUncheckedCreateNestedOneWithoutReferredInput
    promoUses?: PromoCodeUseUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPaymentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
  }

  export type UserUpsertWithoutPaymentsInput = {
    update: XOR<UserUpdateWithoutPaymentsInput, UserUncheckedUpdateWithoutPaymentsInput>
    create: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPaymentsInput, UserUncheckedUpdateWithoutPaymentsInput>
  }

  export type UserUpdateWithoutPaymentsInput = {
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referredBy?: UserUpdateOneWithoutReferralsNestedInput
    referrals?: UserUpdateManyWithoutReferredByNestedInput
    searches?: SearchUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUpdateOneWithoutUserNestedInput
    adminLogs?: AdminLogUpdateManyWithoutUserNestedInput
    sentReferrals?: ReferralUpdateManyWithoutReferrerNestedInput
    gotReferral?: ReferralUpdateOneWithoutReferredNestedInput
    promoUses?: PromoCodeUseUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPaymentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    referredByUserId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrals?: UserUncheckedUpdateManyWithoutReferredByNestedInput
    searches?: SearchUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUncheckedUpdateOneWithoutUserNestedInput
    adminLogs?: AdminLogUncheckedUpdateManyWithoutUserNestedInput
    sentReferrals?: ReferralUncheckedUpdateManyWithoutReferrerNestedInput
    gotReferral?: ReferralUncheckedUpdateOneWithoutReferredNestedInput
    promoUses?: PromoCodeUseUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutFavoritesInput = {
    telegramId: bigint | number
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    plan?: $Enums.Plan
    subscriptionUntil?: Date | string | null
    isBanned?: boolean
    banReason?: string | null
    dailyNotificationCount?: number
    dailyNotificationLimitResetAt?: Date | string
    limitNotifiedAt?: Date | string | null
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    trialUsed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    referredBy?: UserCreateNestedOneWithoutReferralsInput
    referrals?: UserCreateNestedManyWithoutReferredByInput
    searches?: SearchCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    settings?: UserSettingsCreateNestedOneWithoutUserInput
    adminLogs?: AdminLogCreateNestedManyWithoutUserInput
    sentReferrals?: ReferralCreateNestedManyWithoutReferrerInput
    gotReferral?: ReferralCreateNestedOneWithoutReferredInput
    promoUses?: PromoCodeUseCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFavoritesInput = {
    id?: number
    telegramId: bigint | number
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    plan?: $Enums.Plan
    subscriptionUntil?: Date | string | null
    isBanned?: boolean
    banReason?: string | null
    dailyNotificationCount?: number
    dailyNotificationLimitResetAt?: Date | string
    limitNotifiedAt?: Date | string | null
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    trialUsed?: boolean
    referredByUserId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    referrals?: UserUncheckedCreateNestedManyWithoutReferredByInput
    searches?: SearchUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    settings?: UserSettingsUncheckedCreateNestedOneWithoutUserInput
    adminLogs?: AdminLogUncheckedCreateNestedManyWithoutUserInput
    sentReferrals?: ReferralUncheckedCreateNestedManyWithoutReferrerInput
    gotReferral?: ReferralUncheckedCreateNestedOneWithoutReferredInput
    promoUses?: PromoCodeUseUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFavoritesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
  }

  export type ListingCreateWithoutFavoritesInput = {
    externalId: string
    title: string
    price?: string | null
    location?: string | null
    imageUrl?: string | null
    url: string
    platform: $Enums.Platform
    publishedAt?: Date | string | null
    foundAt?: Date | string
    firstSeenAt?: Date | string
    isBaseline?: boolean
    notifiedAt?: Date | string | null
    search: SearchCreateNestedOneWithoutListingsInput
    notifications?: NotificationCreateNestedManyWithoutListingInput
  }

  export type ListingUncheckedCreateWithoutFavoritesInput = {
    id?: number
    searchId: number
    externalId: string
    title: string
    price?: string | null
    location?: string | null
    imageUrl?: string | null
    url: string
    platform: $Enums.Platform
    publishedAt?: Date | string | null
    foundAt?: Date | string
    firstSeenAt?: Date | string
    isBaseline?: boolean
    notifiedAt?: Date | string | null
    notifications?: NotificationUncheckedCreateNestedManyWithoutListingInput
  }

  export type ListingCreateOrConnectWithoutFavoritesInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutFavoritesInput, ListingUncheckedCreateWithoutFavoritesInput>
  }

  export type UserUpsertWithoutFavoritesInput = {
    update: XOR<UserUpdateWithoutFavoritesInput, UserUncheckedUpdateWithoutFavoritesInput>
    create: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFavoritesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFavoritesInput, UserUncheckedUpdateWithoutFavoritesInput>
  }

  export type UserUpdateWithoutFavoritesInput = {
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referredBy?: UserUpdateOneWithoutReferralsNestedInput
    referrals?: UserUpdateManyWithoutReferredByNestedInput
    searches?: SearchUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUpdateOneWithoutUserNestedInput
    adminLogs?: AdminLogUpdateManyWithoutUserNestedInput
    sentReferrals?: ReferralUpdateManyWithoutReferrerNestedInput
    gotReferral?: ReferralUpdateOneWithoutReferredNestedInput
    promoUses?: PromoCodeUseUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFavoritesInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    referredByUserId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrals?: UserUncheckedUpdateManyWithoutReferredByNestedInput
    searches?: SearchUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUncheckedUpdateOneWithoutUserNestedInput
    adminLogs?: AdminLogUncheckedUpdateManyWithoutUserNestedInput
    sentReferrals?: ReferralUncheckedUpdateManyWithoutReferrerNestedInput
    gotReferral?: ReferralUncheckedUpdateOneWithoutReferredNestedInput
    promoUses?: PromoCodeUseUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ListingUpsertWithoutFavoritesInput = {
    update: XOR<ListingUpdateWithoutFavoritesInput, ListingUncheckedUpdateWithoutFavoritesInput>
    create: XOR<ListingCreateWithoutFavoritesInput, ListingUncheckedCreateWithoutFavoritesInput>
    where?: ListingWhereInput
  }

  export type ListingUpdateToOneWithWhereWithoutFavoritesInput = {
    where?: ListingWhereInput
    data: XOR<ListingUpdateWithoutFavoritesInput, ListingUncheckedUpdateWithoutFavoritesInput>
  }

  export type ListingUpdateWithoutFavoritesInput = {
    externalId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    price?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    foundAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isBaseline?: BoolFieldUpdateOperationsInput | boolean
    notifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    search?: SearchUpdateOneRequiredWithoutListingsNestedInput
    notifications?: NotificationUpdateManyWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateWithoutFavoritesInput = {
    id?: IntFieldUpdateOperationsInput | number
    searchId?: IntFieldUpdateOperationsInput | number
    externalId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    price?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    foundAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isBaseline?: BoolFieldUpdateOperationsInput | boolean
    notifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notifications?: NotificationUncheckedUpdateManyWithoutListingNestedInput
  }

  export type UserCreateWithoutNotificationsInput = {
    telegramId: bigint | number
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    plan?: $Enums.Plan
    subscriptionUntil?: Date | string | null
    isBanned?: boolean
    banReason?: string | null
    dailyNotificationCount?: number
    dailyNotificationLimitResetAt?: Date | string
    limitNotifiedAt?: Date | string | null
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    trialUsed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    referredBy?: UserCreateNestedOneWithoutReferralsInput
    referrals?: UserCreateNestedManyWithoutReferredByInput
    searches?: SearchCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    settings?: UserSettingsCreateNestedOneWithoutUserInput
    adminLogs?: AdminLogCreateNestedManyWithoutUserInput
    sentReferrals?: ReferralCreateNestedManyWithoutReferrerInput
    gotReferral?: ReferralCreateNestedOneWithoutReferredInput
    promoUses?: PromoCodeUseCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: number
    telegramId: bigint | number
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    plan?: $Enums.Plan
    subscriptionUntil?: Date | string | null
    isBanned?: boolean
    banReason?: string | null
    dailyNotificationCount?: number
    dailyNotificationLimitResetAt?: Date | string
    limitNotifiedAt?: Date | string | null
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    trialUsed?: boolean
    referredByUserId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    referrals?: UserUncheckedCreateNestedManyWithoutReferredByInput
    searches?: SearchUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    settings?: UserSettingsUncheckedCreateNestedOneWithoutUserInput
    adminLogs?: AdminLogUncheckedCreateNestedManyWithoutUserInput
    sentReferrals?: ReferralUncheckedCreateNestedManyWithoutReferrerInput
    gotReferral?: ReferralUncheckedCreateNestedOneWithoutReferredInput
    promoUses?: PromoCodeUseUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type SearchCreateWithoutNotificationsInput = {
    name?: string | null
    platform: $Enums.Platform
    url: string
    status?: $Enums.SearchStatus
    isActive?: boolean
    errorCount?: number
    lastError?: string | null
    lastCheckedAt?: Date | string | null
    lastFoundAt?: Date | string | null
    baselineInitializedAt?: Date | string | null
    lastNewListingAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSearchesInput
    listings?: ListingCreateNestedManyWithoutSearchInput
  }

  export type SearchUncheckedCreateWithoutNotificationsInput = {
    id?: number
    userId: number
    name?: string | null
    platform: $Enums.Platform
    url: string
    status?: $Enums.SearchStatus
    isActive?: boolean
    errorCount?: number
    lastError?: string | null
    lastCheckedAt?: Date | string | null
    lastFoundAt?: Date | string | null
    baselineInitializedAt?: Date | string | null
    lastNewListingAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ListingUncheckedCreateNestedManyWithoutSearchInput
  }

  export type SearchCreateOrConnectWithoutNotificationsInput = {
    where: SearchWhereUniqueInput
    create: XOR<SearchCreateWithoutNotificationsInput, SearchUncheckedCreateWithoutNotificationsInput>
  }

  export type ListingCreateWithoutNotificationsInput = {
    externalId: string
    title: string
    price?: string | null
    location?: string | null
    imageUrl?: string | null
    url: string
    platform: $Enums.Platform
    publishedAt?: Date | string | null
    foundAt?: Date | string
    firstSeenAt?: Date | string
    isBaseline?: boolean
    notifiedAt?: Date | string | null
    search: SearchCreateNestedOneWithoutListingsInput
    favorites?: FavoriteCreateNestedManyWithoutListingInput
  }

  export type ListingUncheckedCreateWithoutNotificationsInput = {
    id?: number
    searchId: number
    externalId: string
    title: string
    price?: string | null
    location?: string | null
    imageUrl?: string | null
    url: string
    platform: $Enums.Platform
    publishedAt?: Date | string | null
    foundAt?: Date | string
    firstSeenAt?: Date | string
    isBaseline?: boolean
    notifiedAt?: Date | string | null
    favorites?: FavoriteUncheckedCreateNestedManyWithoutListingInput
  }

  export type ListingCreateOrConnectWithoutNotificationsInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutNotificationsInput, ListingUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referredBy?: UserUpdateOneWithoutReferralsNestedInput
    referrals?: UserUpdateManyWithoutReferredByNestedInput
    searches?: SearchUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUpdateOneWithoutUserNestedInput
    adminLogs?: AdminLogUpdateManyWithoutUserNestedInput
    sentReferrals?: ReferralUpdateManyWithoutReferrerNestedInput
    gotReferral?: ReferralUpdateOneWithoutReferredNestedInput
    promoUses?: PromoCodeUseUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    referredByUserId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrals?: UserUncheckedUpdateManyWithoutReferredByNestedInput
    searches?: SearchUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUncheckedUpdateOneWithoutUserNestedInput
    adminLogs?: AdminLogUncheckedUpdateManyWithoutUserNestedInput
    sentReferrals?: ReferralUncheckedUpdateManyWithoutReferrerNestedInput
    gotReferral?: ReferralUncheckedUpdateOneWithoutReferredNestedInput
    promoUses?: PromoCodeUseUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SearchUpsertWithoutNotificationsInput = {
    update: XOR<SearchUpdateWithoutNotificationsInput, SearchUncheckedUpdateWithoutNotificationsInput>
    create: XOR<SearchCreateWithoutNotificationsInput, SearchUncheckedCreateWithoutNotificationsInput>
    where?: SearchWhereInput
  }

  export type SearchUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: SearchWhereInput
    data: XOR<SearchUpdateWithoutNotificationsInput, SearchUncheckedUpdateWithoutNotificationsInput>
  }

  export type SearchUpdateWithoutNotificationsInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    url?: StringFieldUpdateOperationsInput | string
    status?: EnumSearchStatusFieldUpdateOperationsInput | $Enums.SearchStatus
    isActive?: BoolFieldUpdateOperationsInput | boolean
    errorCount?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    lastCheckedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFoundAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    baselineInitializedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNewListingAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSearchesNestedInput
    listings?: ListingUpdateManyWithoutSearchNestedInput
  }

  export type SearchUncheckedUpdateWithoutNotificationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    url?: StringFieldUpdateOperationsInput | string
    status?: EnumSearchStatusFieldUpdateOperationsInput | $Enums.SearchStatus
    isActive?: BoolFieldUpdateOperationsInput | boolean
    errorCount?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    lastCheckedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFoundAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    baselineInitializedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNewListingAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ListingUncheckedUpdateManyWithoutSearchNestedInput
  }

  export type ListingUpsertWithoutNotificationsInput = {
    update: XOR<ListingUpdateWithoutNotificationsInput, ListingUncheckedUpdateWithoutNotificationsInput>
    create: XOR<ListingCreateWithoutNotificationsInput, ListingUncheckedCreateWithoutNotificationsInput>
    where?: ListingWhereInput
  }

  export type ListingUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: ListingWhereInput
    data: XOR<ListingUpdateWithoutNotificationsInput, ListingUncheckedUpdateWithoutNotificationsInput>
  }

  export type ListingUpdateWithoutNotificationsInput = {
    externalId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    price?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    foundAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isBaseline?: BoolFieldUpdateOperationsInput | boolean
    notifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    search?: SearchUpdateOneRequiredWithoutListingsNestedInput
    favorites?: FavoriteUpdateManyWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateWithoutNotificationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    searchId?: IntFieldUpdateOperationsInput | number
    externalId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    price?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    foundAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isBaseline?: BoolFieldUpdateOperationsInput | boolean
    notifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    favorites?: FavoriteUncheckedUpdateManyWithoutListingNestedInput
  }

  export type UserCreateWithoutSettingsInput = {
    telegramId: bigint | number
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    plan?: $Enums.Plan
    subscriptionUntil?: Date | string | null
    isBanned?: boolean
    banReason?: string | null
    dailyNotificationCount?: number
    dailyNotificationLimitResetAt?: Date | string
    limitNotifiedAt?: Date | string | null
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    trialUsed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    referredBy?: UserCreateNestedOneWithoutReferralsInput
    referrals?: UserCreateNestedManyWithoutReferredByInput
    searches?: SearchCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    adminLogs?: AdminLogCreateNestedManyWithoutUserInput
    sentReferrals?: ReferralCreateNestedManyWithoutReferrerInput
    gotReferral?: ReferralCreateNestedOneWithoutReferredInput
    promoUses?: PromoCodeUseCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSettingsInput = {
    id?: number
    telegramId: bigint | number
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    plan?: $Enums.Plan
    subscriptionUntil?: Date | string | null
    isBanned?: boolean
    banReason?: string | null
    dailyNotificationCount?: number
    dailyNotificationLimitResetAt?: Date | string
    limitNotifiedAt?: Date | string | null
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    trialUsed?: boolean
    referredByUserId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    referrals?: UserUncheckedCreateNestedManyWithoutReferredByInput
    searches?: SearchUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    adminLogs?: AdminLogUncheckedCreateNestedManyWithoutUserInput
    sentReferrals?: ReferralUncheckedCreateNestedManyWithoutReferrerInput
    gotReferral?: ReferralUncheckedCreateNestedOneWithoutReferredInput
    promoUses?: PromoCodeUseUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSettingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
  }

  export type UserUpsertWithoutSettingsInput = {
    update: XOR<UserUpdateWithoutSettingsInput, UserUncheckedUpdateWithoutSettingsInput>
    create: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSettingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSettingsInput, UserUncheckedUpdateWithoutSettingsInput>
  }

  export type UserUpdateWithoutSettingsInput = {
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referredBy?: UserUpdateOneWithoutReferralsNestedInput
    referrals?: UserUpdateManyWithoutReferredByNestedInput
    searches?: SearchUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    adminLogs?: AdminLogUpdateManyWithoutUserNestedInput
    sentReferrals?: ReferralUpdateManyWithoutReferrerNestedInput
    gotReferral?: ReferralUpdateOneWithoutReferredNestedInput
    promoUses?: PromoCodeUseUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSettingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    referredByUserId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrals?: UserUncheckedUpdateManyWithoutReferredByNestedInput
    searches?: SearchUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    adminLogs?: AdminLogUncheckedUpdateManyWithoutUserNestedInput
    sentReferrals?: ReferralUncheckedUpdateManyWithoutReferrerNestedInput
    gotReferral?: ReferralUncheckedUpdateOneWithoutReferredNestedInput
    promoUses?: PromoCodeUseUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PromoCodeUseCreateWithoutPromoCodeInput = {
    usedAt?: Date | string
    user: UserCreateNestedOneWithoutPromoUsesInput
  }

  export type PromoCodeUseUncheckedCreateWithoutPromoCodeInput = {
    id?: number
    userId: number
    usedAt?: Date | string
  }

  export type PromoCodeUseCreateOrConnectWithoutPromoCodeInput = {
    where: PromoCodeUseWhereUniqueInput
    create: XOR<PromoCodeUseCreateWithoutPromoCodeInput, PromoCodeUseUncheckedCreateWithoutPromoCodeInput>
  }

  export type PromoCodeUseCreateManyPromoCodeInputEnvelope = {
    data: PromoCodeUseCreateManyPromoCodeInput | PromoCodeUseCreateManyPromoCodeInput[]
    skipDuplicates?: boolean
  }

  export type PromoCodeUseUpsertWithWhereUniqueWithoutPromoCodeInput = {
    where: PromoCodeUseWhereUniqueInput
    update: XOR<PromoCodeUseUpdateWithoutPromoCodeInput, PromoCodeUseUncheckedUpdateWithoutPromoCodeInput>
    create: XOR<PromoCodeUseCreateWithoutPromoCodeInput, PromoCodeUseUncheckedCreateWithoutPromoCodeInput>
  }

  export type PromoCodeUseUpdateWithWhereUniqueWithoutPromoCodeInput = {
    where: PromoCodeUseWhereUniqueInput
    data: XOR<PromoCodeUseUpdateWithoutPromoCodeInput, PromoCodeUseUncheckedUpdateWithoutPromoCodeInput>
  }

  export type PromoCodeUseUpdateManyWithWhereWithoutPromoCodeInput = {
    where: PromoCodeUseScalarWhereInput
    data: XOR<PromoCodeUseUpdateManyMutationInput, PromoCodeUseUncheckedUpdateManyWithoutPromoCodeInput>
  }

  export type PromoCodeCreateWithoutUsesInput = {
    code: string
    plan: $Enums.Plan
    days: number
    maxUses: number
    usedCount?: number
    expiresAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
  }

  export type PromoCodeUncheckedCreateWithoutUsesInput = {
    id?: number
    code: string
    plan: $Enums.Plan
    days: number
    maxUses: number
    usedCount?: number
    expiresAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
  }

  export type PromoCodeCreateOrConnectWithoutUsesInput = {
    where: PromoCodeWhereUniqueInput
    create: XOR<PromoCodeCreateWithoutUsesInput, PromoCodeUncheckedCreateWithoutUsesInput>
  }

  export type UserCreateWithoutPromoUsesInput = {
    telegramId: bigint | number
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    plan?: $Enums.Plan
    subscriptionUntil?: Date | string | null
    isBanned?: boolean
    banReason?: string | null
    dailyNotificationCount?: number
    dailyNotificationLimitResetAt?: Date | string
    limitNotifiedAt?: Date | string | null
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    trialUsed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    referredBy?: UserCreateNestedOneWithoutReferralsInput
    referrals?: UserCreateNestedManyWithoutReferredByInput
    searches?: SearchCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    settings?: UserSettingsCreateNestedOneWithoutUserInput
    adminLogs?: AdminLogCreateNestedManyWithoutUserInput
    sentReferrals?: ReferralCreateNestedManyWithoutReferrerInput
    gotReferral?: ReferralCreateNestedOneWithoutReferredInput
  }

  export type UserUncheckedCreateWithoutPromoUsesInput = {
    id?: number
    telegramId: bigint | number
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    plan?: $Enums.Plan
    subscriptionUntil?: Date | string | null
    isBanned?: boolean
    banReason?: string | null
    dailyNotificationCount?: number
    dailyNotificationLimitResetAt?: Date | string
    limitNotifiedAt?: Date | string | null
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    trialUsed?: boolean
    referredByUserId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    referrals?: UserUncheckedCreateNestedManyWithoutReferredByInput
    searches?: SearchUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    settings?: UserSettingsUncheckedCreateNestedOneWithoutUserInput
    adminLogs?: AdminLogUncheckedCreateNestedManyWithoutUserInput
    sentReferrals?: ReferralUncheckedCreateNestedManyWithoutReferrerInput
    gotReferral?: ReferralUncheckedCreateNestedOneWithoutReferredInput
  }

  export type UserCreateOrConnectWithoutPromoUsesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPromoUsesInput, UserUncheckedCreateWithoutPromoUsesInput>
  }

  export type PromoCodeUpsertWithoutUsesInput = {
    update: XOR<PromoCodeUpdateWithoutUsesInput, PromoCodeUncheckedUpdateWithoutUsesInput>
    create: XOR<PromoCodeCreateWithoutUsesInput, PromoCodeUncheckedCreateWithoutUsesInput>
    where?: PromoCodeWhereInput
  }

  export type PromoCodeUpdateToOneWithWhereWithoutUsesInput = {
    where?: PromoCodeWhereInput
    data: XOR<PromoCodeUpdateWithoutUsesInput, PromoCodeUncheckedUpdateWithoutUsesInput>
  }

  export type PromoCodeUpdateWithoutUsesInput = {
    code?: StringFieldUpdateOperationsInput | string
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    days?: IntFieldUpdateOperationsInput | number
    maxUses?: IntFieldUpdateOperationsInput | number
    usedCount?: IntFieldUpdateOperationsInput | number
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromoCodeUncheckedUpdateWithoutUsesInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    days?: IntFieldUpdateOperationsInput | number
    maxUses?: IntFieldUpdateOperationsInput | number
    usedCount?: IntFieldUpdateOperationsInput | number
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutPromoUsesInput = {
    update: XOR<UserUpdateWithoutPromoUsesInput, UserUncheckedUpdateWithoutPromoUsesInput>
    create: XOR<UserCreateWithoutPromoUsesInput, UserUncheckedCreateWithoutPromoUsesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPromoUsesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPromoUsesInput, UserUncheckedUpdateWithoutPromoUsesInput>
  }

  export type UserUpdateWithoutPromoUsesInput = {
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referredBy?: UserUpdateOneWithoutReferralsNestedInput
    referrals?: UserUpdateManyWithoutReferredByNestedInput
    searches?: SearchUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUpdateOneWithoutUserNestedInput
    adminLogs?: AdminLogUpdateManyWithoutUserNestedInput
    sentReferrals?: ReferralUpdateManyWithoutReferrerNestedInput
    gotReferral?: ReferralUpdateOneWithoutReferredNestedInput
  }

  export type UserUncheckedUpdateWithoutPromoUsesInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    referredByUserId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrals?: UserUncheckedUpdateManyWithoutReferredByNestedInput
    searches?: SearchUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUncheckedUpdateOneWithoutUserNestedInput
    adminLogs?: AdminLogUncheckedUpdateManyWithoutUserNestedInput
    sentReferrals?: ReferralUncheckedUpdateManyWithoutReferrerNestedInput
    gotReferral?: ReferralUncheckedUpdateOneWithoutReferredNestedInput
  }

  export type UserCreateWithoutSentReferralsInput = {
    telegramId: bigint | number
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    plan?: $Enums.Plan
    subscriptionUntil?: Date | string | null
    isBanned?: boolean
    banReason?: string | null
    dailyNotificationCount?: number
    dailyNotificationLimitResetAt?: Date | string
    limitNotifiedAt?: Date | string | null
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    trialUsed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    referredBy?: UserCreateNestedOneWithoutReferralsInput
    referrals?: UserCreateNestedManyWithoutReferredByInput
    searches?: SearchCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    settings?: UserSettingsCreateNestedOneWithoutUserInput
    adminLogs?: AdminLogCreateNestedManyWithoutUserInput
    gotReferral?: ReferralCreateNestedOneWithoutReferredInput
    promoUses?: PromoCodeUseCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSentReferralsInput = {
    id?: number
    telegramId: bigint | number
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    plan?: $Enums.Plan
    subscriptionUntil?: Date | string | null
    isBanned?: boolean
    banReason?: string | null
    dailyNotificationCount?: number
    dailyNotificationLimitResetAt?: Date | string
    limitNotifiedAt?: Date | string | null
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    trialUsed?: boolean
    referredByUserId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    referrals?: UserUncheckedCreateNestedManyWithoutReferredByInput
    searches?: SearchUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    settings?: UserSettingsUncheckedCreateNestedOneWithoutUserInput
    adminLogs?: AdminLogUncheckedCreateNestedManyWithoutUserInput
    gotReferral?: ReferralUncheckedCreateNestedOneWithoutReferredInput
    promoUses?: PromoCodeUseUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSentReferralsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSentReferralsInput, UserUncheckedCreateWithoutSentReferralsInput>
  }

  export type UserCreateWithoutGotReferralInput = {
    telegramId: bigint | number
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    plan?: $Enums.Plan
    subscriptionUntil?: Date | string | null
    isBanned?: boolean
    banReason?: string | null
    dailyNotificationCount?: number
    dailyNotificationLimitResetAt?: Date | string
    limitNotifiedAt?: Date | string | null
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    trialUsed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    referredBy?: UserCreateNestedOneWithoutReferralsInput
    referrals?: UserCreateNestedManyWithoutReferredByInput
    searches?: SearchCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    settings?: UserSettingsCreateNestedOneWithoutUserInput
    adminLogs?: AdminLogCreateNestedManyWithoutUserInput
    sentReferrals?: ReferralCreateNestedManyWithoutReferrerInput
    promoUses?: PromoCodeUseCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGotReferralInput = {
    id?: number
    telegramId: bigint | number
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    plan?: $Enums.Plan
    subscriptionUntil?: Date | string | null
    isBanned?: boolean
    banReason?: string | null
    dailyNotificationCount?: number
    dailyNotificationLimitResetAt?: Date | string
    limitNotifiedAt?: Date | string | null
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    trialUsed?: boolean
    referredByUserId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    referrals?: UserUncheckedCreateNestedManyWithoutReferredByInput
    searches?: SearchUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    settings?: UserSettingsUncheckedCreateNestedOneWithoutUserInput
    adminLogs?: AdminLogUncheckedCreateNestedManyWithoutUserInput
    sentReferrals?: ReferralUncheckedCreateNestedManyWithoutReferrerInput
    promoUses?: PromoCodeUseUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGotReferralInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGotReferralInput, UserUncheckedCreateWithoutGotReferralInput>
  }

  export type UserUpsertWithoutSentReferralsInput = {
    update: XOR<UserUpdateWithoutSentReferralsInput, UserUncheckedUpdateWithoutSentReferralsInput>
    create: XOR<UserCreateWithoutSentReferralsInput, UserUncheckedCreateWithoutSentReferralsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSentReferralsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSentReferralsInput, UserUncheckedUpdateWithoutSentReferralsInput>
  }

  export type UserUpdateWithoutSentReferralsInput = {
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referredBy?: UserUpdateOneWithoutReferralsNestedInput
    referrals?: UserUpdateManyWithoutReferredByNestedInput
    searches?: SearchUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUpdateOneWithoutUserNestedInput
    adminLogs?: AdminLogUpdateManyWithoutUserNestedInput
    gotReferral?: ReferralUpdateOneWithoutReferredNestedInput
    promoUses?: PromoCodeUseUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSentReferralsInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    referredByUserId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrals?: UserUncheckedUpdateManyWithoutReferredByNestedInput
    searches?: SearchUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUncheckedUpdateOneWithoutUserNestedInput
    adminLogs?: AdminLogUncheckedUpdateManyWithoutUserNestedInput
    gotReferral?: ReferralUncheckedUpdateOneWithoutReferredNestedInput
    promoUses?: PromoCodeUseUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutGotReferralInput = {
    update: XOR<UserUpdateWithoutGotReferralInput, UserUncheckedUpdateWithoutGotReferralInput>
    create: XOR<UserCreateWithoutGotReferralInput, UserUncheckedCreateWithoutGotReferralInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGotReferralInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGotReferralInput, UserUncheckedUpdateWithoutGotReferralInput>
  }

  export type UserUpdateWithoutGotReferralInput = {
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referredBy?: UserUpdateOneWithoutReferralsNestedInput
    referrals?: UserUpdateManyWithoutReferredByNestedInput
    searches?: SearchUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUpdateOneWithoutUserNestedInput
    adminLogs?: AdminLogUpdateManyWithoutUserNestedInput
    sentReferrals?: ReferralUpdateManyWithoutReferrerNestedInput
    promoUses?: PromoCodeUseUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGotReferralInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    referredByUserId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrals?: UserUncheckedUpdateManyWithoutReferredByNestedInput
    searches?: SearchUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUncheckedUpdateOneWithoutUserNestedInput
    adminLogs?: AdminLogUncheckedUpdateManyWithoutUserNestedInput
    sentReferrals?: ReferralUncheckedUpdateManyWithoutReferrerNestedInput
    promoUses?: PromoCodeUseUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAdminLogsInput = {
    telegramId: bigint | number
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    plan?: $Enums.Plan
    subscriptionUntil?: Date | string | null
    isBanned?: boolean
    banReason?: string | null
    dailyNotificationCount?: number
    dailyNotificationLimitResetAt?: Date | string
    limitNotifiedAt?: Date | string | null
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    trialUsed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    referredBy?: UserCreateNestedOneWithoutReferralsInput
    referrals?: UserCreateNestedManyWithoutReferredByInput
    searches?: SearchCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    settings?: UserSettingsCreateNestedOneWithoutUserInput
    sentReferrals?: ReferralCreateNestedManyWithoutReferrerInput
    gotReferral?: ReferralCreateNestedOneWithoutReferredInput
    promoUses?: PromoCodeUseCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAdminLogsInput = {
    id?: number
    telegramId: bigint | number
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    plan?: $Enums.Plan
    subscriptionUntil?: Date | string | null
    isBanned?: boolean
    banReason?: string | null
    dailyNotificationCount?: number
    dailyNotificationLimitResetAt?: Date | string
    limitNotifiedAt?: Date | string | null
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    trialUsed?: boolean
    referredByUserId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    referrals?: UserUncheckedCreateNestedManyWithoutReferredByInput
    searches?: SearchUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    settings?: UserSettingsUncheckedCreateNestedOneWithoutUserInput
    sentReferrals?: ReferralUncheckedCreateNestedManyWithoutReferrerInput
    gotReferral?: ReferralUncheckedCreateNestedOneWithoutReferredInput
    promoUses?: PromoCodeUseUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAdminLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAdminLogsInput, UserUncheckedCreateWithoutAdminLogsInput>
  }

  export type UserUpsertWithoutAdminLogsInput = {
    update: XOR<UserUpdateWithoutAdminLogsInput, UserUncheckedUpdateWithoutAdminLogsInput>
    create: XOR<UserCreateWithoutAdminLogsInput, UserUncheckedCreateWithoutAdminLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAdminLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAdminLogsInput, UserUncheckedUpdateWithoutAdminLogsInput>
  }

  export type UserUpdateWithoutAdminLogsInput = {
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referredBy?: UserUpdateOneWithoutReferralsNestedInput
    referrals?: UserUpdateManyWithoutReferredByNestedInput
    searches?: SearchUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUpdateOneWithoutUserNestedInput
    sentReferrals?: ReferralUpdateManyWithoutReferrerNestedInput
    gotReferral?: ReferralUpdateOneWithoutReferredNestedInput
    promoUses?: PromoCodeUseUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAdminLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    referredByUserId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrals?: UserUncheckedUpdateManyWithoutReferredByNestedInput
    searches?: SearchUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUncheckedUpdateOneWithoutUserNestedInput
    sentReferrals?: ReferralUncheckedUpdateManyWithoutReferrerNestedInput
    gotReferral?: ReferralUncheckedUpdateOneWithoutReferredNestedInput
    promoUses?: PromoCodeUseUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyReferredByInput = {
    id?: number
    telegramId: bigint | number
    username?: string | null
    firstName?: string | null
    lastName?: string | null
    plan?: $Enums.Plan
    subscriptionUntil?: Date | string | null
    isBanned?: boolean
    banReason?: string | null
    dailyNotificationCount?: number
    dailyNotificationLimitResetAt?: Date | string
    limitNotifiedAt?: Date | string | null
    trialStartedAt?: Date | string | null
    trialEndsAt?: Date | string | null
    trialUsed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
  }

  export type SearchCreateManyUserInput = {
    id?: number
    name?: string | null
    platform: $Enums.Platform
    url: string
    status?: $Enums.SearchStatus
    isActive?: boolean
    errorCount?: number
    lastError?: string | null
    lastCheckedAt?: Date | string | null
    lastFoundAt?: Date | string | null
    baselineInitializedAt?: Date | string | null
    lastNewListingAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateManyUserInput = {
    id?: number
    telegramPaymentChargeId?: string | null
    plan: $Enums.Plan
    days: number
    stars: number
    status?: $Enums.PaymentStatus
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type FavoriteCreateManyUserInput = {
    id?: number
    listingId: number
    createdAt?: Date | string
  }

  export type NotificationCreateManyUserInput = {
    id?: number
    searchId: number
    listingId: number
    status?: $Enums.NotificationStatus
    sentAt?: Date | string | null
    failReason?: string | null
    createdAt?: Date | string
  }

  export type AdminLogCreateManyUserInput = {
    id?: number
    action: string
    details?: string | null
    createdAt?: Date | string
  }

  export type ReferralCreateManyReferrerInput = {
    id?: number
    referredId: number
    bonusDays?: number
    createdAt?: Date | string
  }

  export type PromoCodeUseCreateManyUserInput = {
    id?: number
    promoCodeId: number
    usedAt?: Date | string
  }

  export type UserUpdateWithoutReferredByInput = {
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrals?: UserUpdateManyWithoutReferredByNestedInput
    searches?: SearchUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUpdateOneWithoutUserNestedInput
    adminLogs?: AdminLogUpdateManyWithoutUserNestedInput
    sentReferrals?: ReferralUpdateManyWithoutReferrerNestedInput
    gotReferral?: ReferralUpdateOneWithoutReferredNestedInput
    promoUses?: PromoCodeUseUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReferredByInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referrals?: UserUncheckedUpdateManyWithoutReferredByNestedInput
    searches?: SearchUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUncheckedUpdateOneWithoutUserNestedInput
    adminLogs?: AdminLogUncheckedUpdateManyWithoutUserNestedInput
    sentReferrals?: ReferralUncheckedUpdateManyWithoutReferrerNestedInput
    gotReferral?: ReferralUncheckedUpdateOneWithoutReferredNestedInput
    promoUses?: PromoCodeUseUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutReferredByInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    subscriptionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    dailyNotificationCount?: IntFieldUpdateOperationsInput | number
    dailyNotificationLimitResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limitNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trialUsed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchUpdateWithoutUserInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    url?: StringFieldUpdateOperationsInput | string
    status?: EnumSearchStatusFieldUpdateOperationsInput | $Enums.SearchStatus
    isActive?: BoolFieldUpdateOperationsInput | boolean
    errorCount?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    lastCheckedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFoundAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    baselineInitializedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNewListingAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ListingUpdateManyWithoutSearchNestedInput
    notifications?: NotificationUpdateManyWithoutSearchNestedInput
  }

  export type SearchUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    url?: StringFieldUpdateOperationsInput | string
    status?: EnumSearchStatusFieldUpdateOperationsInput | $Enums.SearchStatus
    isActive?: BoolFieldUpdateOperationsInput | boolean
    errorCount?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    lastCheckedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFoundAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    baselineInitializedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNewListingAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ListingUncheckedUpdateManyWithoutSearchNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutSearchNestedInput
  }

  export type SearchUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    url?: StringFieldUpdateOperationsInput | string
    status?: EnumSearchStatusFieldUpdateOperationsInput | $Enums.SearchStatus
    isActive?: BoolFieldUpdateOperationsInput | boolean
    errorCount?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    lastCheckedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFoundAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    baselineInitializedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNewListingAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpdateWithoutUserInput = {
    telegramPaymentChargeId?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    days?: IntFieldUpdateOperationsInput | number
    stars?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PaymentUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramPaymentChargeId?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    days?: IntFieldUpdateOperationsInput | number
    stars?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PaymentUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramPaymentChargeId?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    days?: IntFieldUpdateOperationsInput | number
    stars?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FavoriteUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listing?: ListingUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type FavoriteUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    search?: SearchUpdateOneRequiredWithoutNotificationsNestedInput
    listing?: ListingUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    searchId?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    searchId?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminLogUpdateWithoutUserInput = {
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminLogUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminLogUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralUpdateWithoutReferrerInput = {
    bonusDays?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referred?: UserUpdateOneRequiredWithoutGotReferralNestedInput
  }

  export type ReferralUncheckedUpdateWithoutReferrerInput = {
    id?: IntFieldUpdateOperationsInput | number
    referredId?: IntFieldUpdateOperationsInput | number
    bonusDays?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralUncheckedUpdateManyWithoutReferrerInput = {
    id?: IntFieldUpdateOperationsInput | number
    referredId?: IntFieldUpdateOperationsInput | number
    bonusDays?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromoCodeUseUpdateWithoutUserInput = {
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoCode?: PromoCodeUpdateOneRequiredWithoutUsesNestedInput
  }

  export type PromoCodeUseUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    promoCodeId?: IntFieldUpdateOperationsInput | number
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromoCodeUseUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    promoCodeId?: IntFieldUpdateOperationsInput | number
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingCreateManySearchInput = {
    id?: number
    externalId: string
    title: string
    price?: string | null
    location?: string | null
    imageUrl?: string | null
    url: string
    platform: $Enums.Platform
    publishedAt?: Date | string | null
    foundAt?: Date | string
    firstSeenAt?: Date | string
    isBaseline?: boolean
    notifiedAt?: Date | string | null
  }

  export type NotificationCreateManySearchInput = {
    id?: number
    userId: number
    listingId: number
    status?: $Enums.NotificationStatus
    sentAt?: Date | string | null
    failReason?: string | null
    createdAt?: Date | string
  }

  export type ListingUpdateWithoutSearchInput = {
    externalId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    price?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    foundAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isBaseline?: BoolFieldUpdateOperationsInput | boolean
    notifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notifications?: NotificationUpdateManyWithoutListingNestedInput
    favorites?: FavoriteUpdateManyWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateWithoutSearchInput = {
    id?: IntFieldUpdateOperationsInput | number
    externalId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    price?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    foundAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isBaseline?: BoolFieldUpdateOperationsInput | boolean
    notifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notifications?: NotificationUncheckedUpdateManyWithoutListingNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateManyWithoutSearchInput = {
    id?: IntFieldUpdateOperationsInput | number
    externalId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    price?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    foundAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isBaseline?: BoolFieldUpdateOperationsInput | boolean
    notifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NotificationUpdateWithoutSearchInput = {
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
    listing?: ListingUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateWithoutSearchInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutSearchInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyListingInput = {
    id?: number
    userId: number
    searchId: number
    status?: $Enums.NotificationStatus
    sentAt?: Date | string | null
    failReason?: string | null
    createdAt?: Date | string
  }

  export type FavoriteCreateManyListingInput = {
    id?: number
    userId: number
    createdAt?: Date | string
  }

  export type NotificationUpdateWithoutListingInput = {
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
    search?: SearchUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateWithoutListingInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    searchId?: IntFieldUpdateOperationsInput | number
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutListingInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    searchId?: IntFieldUpdateOperationsInput | number
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteUpdateWithoutListingInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type FavoriteUncheckedUpdateWithoutListingInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteUncheckedUpdateManyWithoutListingInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromoCodeUseCreateManyPromoCodeInput = {
    id?: number
    userId: number
    usedAt?: Date | string
  }

  export type PromoCodeUseUpdateWithoutPromoCodeInput = {
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPromoUsesNestedInput
  }

  export type PromoCodeUseUncheckedUpdateWithoutPromoCodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromoCodeUseUncheckedUpdateManyWithoutPromoCodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}