import { clsx } from 'clsx';
import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-3 py-5 lg:py-0 px-6 block">
      <ol className={clsx('flex text-xl md:text-2xl')}>
        {breadcrumbs.map((breadcrumb, index) => {
          const LinkIcon = breadcrumb.icon;

          return (
            <li
              key={breadcrumb.href}
              aria-current={breadcrumb.active}
              className={clsx(
                breadcrumb.active ? 'text-neutral-900' : 'text-neutral-500',
              )}
            >
              {
                LinkIcon && <LinkIcon className="w-7 inline-block mr-3" />
              }
              
              <Link href={breadcrumb.href}>
                {breadcrumb.label}
              </Link>
              {index < breadcrumbs.length - 1 ? (
                <span className="mx-3 inline-block">/</span>
              ) : null}
            </li>
          )
          
        })}
      </ol>
    </nav>
  );
}
